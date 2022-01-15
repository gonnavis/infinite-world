import * as THREE from 'three'

import Game from './Game.js'
import Chunk from './Chunk.js'

export default class ChunksManager
{
    constructor()
    {
        this.game = new Game()
        this.scene = this.game.scene
        this.mathUtils = this.game.mathUtils

        this.minSize = 16
        this.maxSize = this.minSize * 6

        this.chunks = []

        this.setReference()

        const nineGrid = this.getNineGrid()
        for(const gridItem of nineGrid)
        {
            const chunk = new Chunk(this, this.maxSize, gridItem.x, gridItem.z)
            this.chunks.push(chunk)
        }
    }

    setReference()
    {
        this.reference = {}
        this.reference.position = {
            x: 0,
            y: 0,
            z: 0
        }
        this.reference.controls = {
            up: false,
            right: false,
            down: false,
            left: false,
            shift: false
        }

        window.addEventListener('keydown', (event) =>
        {
            if(event.key === 'ArrowUp')
                this.reference.controls.up = true
            else if(event.key === 'ArrowRight')
                this.reference.controls.right = true
            else if(event.key === 'ArrowDown')
                this.reference.controls.down = true
            else if(event.key === 'ArrowLeft')
                this.reference.controls.left = true
            else if(event.key === 'Shift')
                this.reference.controls.shift = true
        })

        window.addEventListener('keyup', (event) =>
        {
            if(event.key === 'ArrowUp')
                this.reference.controls.up = false
            else if(event.key === 'ArrowRight')
                this.reference.controls.right = false
            else if(event.key === 'ArrowDown')
                this.reference.controls.down = false
            else if(event.key === 'ArrowLeft')
                this.reference.controls.left = false
            else if(event.key === 'Shift')
                this.reference.controls.shift = false
        })

        this.reference.helper = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
        )

        this.scene.add(this.reference.helper)
    }

    getNineGrid()
    {
        const currentX = Math.round(this.reference.position.x / this.maxSize)
        const currentZ = Math.round(this.reference.position.z / this.maxSize)

        const grid = [
            { x: currentX, z: currentZ }, // Current
            { x: currentX, z: currentZ + 1 }, // Up
            { x: currentX + 1, z: currentZ + 1, }, // Up right
            { x: currentX + 1, z: currentZ }, // Right
            { x: currentX + 1, z: currentZ - 1 }, // Down right 
            { x: currentX, z: currentZ - 1 }, // Down
            { x: currentX - 1, z: currentZ - 1 }, // Down left
            { x: currentX - 1, z: currentZ }, // Left
            { x: currentX - 1, z: currentZ + 1 }, // Up left
        ]

        for(const gridItem of grid)
        {
            gridItem.x *= this.maxSize
            gridItem.z *= this.maxSize
        }

        return grid
    }

    update()
    {
        let moved = false
        const referenceSpeed = this.reference.controls.shift ? 0.5 : 0.1
        if(this.reference.controls.up)
        {
            this.reference.position.z += - referenceSpeed
            moved = true
        }
        if(this.reference.controls.right)
        {
            this.reference.position.x += referenceSpeed
            moved = true
        }
        if(this.reference.controls.down)
        {
            this.reference.position.z += referenceSpeed
            moved = true
        }
        if(this.reference.controls.left)
        {
            this.reference.position.x += - referenceSpeed
            moved = true
        }
        
        if(moved)
        {
            this.reference.helper.position.copy(this.reference.position)
        }

        for(const chunk of this.chunks)
        {
            chunk.testDivide()
        }
    }
}
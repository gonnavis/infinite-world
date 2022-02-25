import * as THREE from 'three'

import vertexShader from '../shaders/grass/vertex.glsl'
import fragmentShader from '../shaders/grass/fragment.glsl'

export default function()
{
    const material = new THREE.ShaderMaterial({
        uniforms:
        {
            uTime: { value: null },
            uGrassDistance: { value: null },
            uPlayerPosition: { value: null },
            uTerrainSize: { value: null },
            uTerrainTextureSize: { value: null },
            uTerrainATexture: { value: null },
            uTerrainAOffset: { value: null },
            uTerrainBTexture: { value: null },
            uTerrainBOffset: { value: null },
            uTerrainCTexture: { value: null },
            uTerrainCOffset: { value: null },
            uTerrainDTexture: { value: null },
            uTerrainDOffset: { value: null },
            uSunPosition: { value: null },
            uNoiseTexture: { value: null }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    })

    return material
}
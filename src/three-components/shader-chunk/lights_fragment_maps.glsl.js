export const lightsChunk = /* glsl */ `
#if defined( RE_IndirectDiffuse )

	#ifdef USE_LIGHTMAP

		vec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;

		#ifndef PHYSICALLY_CORRECT_LIGHTS

			lightMapIrradiance *= PI; // factor of PI should not be present; included here to prevent breakage

		#endif

		irradiance += lightMapIrradiance;

	#endif

	#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )

		irradiance += getLightProbeIndirectIrradiance( /*lightProbe,*/ geometry, maxMipLevel );

	#endif

#endif

// (elalish) Changed the input from blinnShininessExponent to roughness, so that we can use the Trowbridge-Reitz distribution instead.
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )

	radiance += getLightProbeIndirectRadiance( /*specularLightProbe,*/ geometry, material.specularRoughness, maxMipLevel );

	#ifndef STANDARD
		clearCoatRadiance += getLightProbeIndirectRadiance( /*specularLightProbe,*/ geometry, material.clearCoatRoughness, maxMipLevel );
	#endif

#endif
`;

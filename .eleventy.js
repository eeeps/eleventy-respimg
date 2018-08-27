module.exports = function( eleventyConfig, pluginNamespace ) {
	eleventyConfig.namespace( pluginNamespace, () => {
		
		eleventyConfig.addShortcode( 'respimg', function( src, alt, sizes ) {
			
			const fetchBase = `https://res.cloudinary.com/${ eleventyConfig.cloudinaryCloudName }/image/fetch/`;
			
			return `<img
	srcset="${
		eleventyConfig.srcsetWidths.map( ( w ) => {
			return `${ fetchBase }q_auto,f_auto,w_${ w }/${ src } ${ w }w`
		} ).join( ', ' )
	}"
	sizes="${ sizes ? sizes : '100vw' }"
	src="${ fetchBase }q_auto,f_auto,w_${ eleventyConfig.fallbackWidth }/${ src }"
	${ alt ? `alt="${ alt }"` : '' }
/>`;
		
		} );
	
	} );
};
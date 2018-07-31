module.exports = function( eleventyConfig ) {

	// change me!
	eleventyConfig.cloudinaryCloudName = 'eric-cloudinary';
	eleventyConfig.srcsetWidths = [ 320, 640, 960, 1280, 1600, 1920, 2240, 2560 ];
	eleventyConfig.fallbackWidth = 640;

	// {% respimg %} shortcode
	eleventyConfig.addShortcode( 'respimg', function( src, alt, sizes ) {
		
		const fetchBase = `https://res.cloudinary.com/${ eleventyConfig.cloudinaryCloudName }/image/fetch/`;
		
		return `
			<img
				srcset="${
					eleventyConfig.srcsetWidths.map( ( w ) => {
						return `${ fetchBase }q_auto,f_auto,w_${ w }/${ src } ${ w }w`
					} ).join( ', ' )
				}"
				sizes="${ sizes ? sizes : '100vw' }"
				src="${ fetchBase }q_auto,f_auto,w_${ eleventyConfig.fallbackWidth }/${ src }"
				${ alt ? `alt="${ alt }"` : '' }
			/>
		`;
	
	} );
	
};
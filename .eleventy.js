module.exports = function( eleventyConfig ) {

	eleventyConfig.cloudinaryCloudName = 'eric-cloudinary';
	eleventyConfig.srcsetWidths = [ 320, 640, 960, 1280, 1600, 1920, 2240, 2560 ];

	eleventyConfig.addShortcode( 'cldimg', function( src, alt, sizes ) {
		
		const fetchBase = `https://res.cloudinary.com/${ eleventyConfig.cloudinaryCloudName }/image/fetch/`;
		
		return `
			<img
				srcset="${
					eleventyConfig.srcsetWidths.map( ( w ) => {
						return `${ fetchBase }q_auto,f_auto,w_${ w }/${ src } ${ w }w`
					} ).join( ',' )
				}"
				sizes="${ sizes ? sizes : '100vw' }"
				src="${ fetchBase }q_auto,f_auto/${ src }"
				${ alt ? `alt="${ alt }"` : '' }
			/>
		`;
	
	} );
	
};
# `{% respimg %}`

## What does it do?

It turns [config](https://www.11ty.io/docs/config/) like this:

```javascript
eleventyConfig.cloudinaryCloudName = 'your-cloud-name-here';
eleventyConfig.srcsetWidths = [ 320, 640, 960, 1280, 1600, 1920, 2240, 2560 ];
eleventyConfig.fallbackWidth = 640;
```

and [shortcodes](https://www.11ty.io/docs/shortcodes/) like this:

```nunjucks
{% respimg
	"https://cool.img/here.jpg",
	"A cool image",
	"(min-width: 48em) 48em, 100vw"
%}
```

into responsive `<img>` tags, like this:

```html
<img
	srcset="
		https://res.cloudinary.com/your-cloud-name-here/image/fetch/q_auto,f_auto,w_320/https://cool.img/here.jpg 320w,
		https://res.cloudinary.com/your-cloud-name-here/image/fetch/q_auto,f_auto,w_640/https://cool.img/here.jpg 640w,
		https://res.cloudinary.com/your-cloud-name-here/image/fetch/q_auto,f_auto,w_960/https://cool.img/here.jpg 960w,
		https://res.cloudinary.com/your-cloud-name-here/image/fetch/q_auto,f_auto,w_1280/https://cool.img/here.jpg 1280w,
		https://res.cloudinary.com/your-cloud-name-here/image/fetch/q_auto,f_auto,w_1600/https://cool.img/here.jpg 1600w,
		https://res.cloudinary.com/your-cloud-name-here/image/fetch/q_auto,f_auto,w_1920/https://cool.img/here.jpg 1920w,
		https://res.cloudinary.com/your-cloud-name-here/image/fetch/q_auto,f_auto,w_2240/https://cool.img/here.jpg 2240w,
		https://res.cloudinary.com/your-cloud-name-here/image/fetch/q_auto,f_auto,w_2560/https://cool.img/here.jpg 2560w"
	sizes="(min-width: 48em) 48em, 100vw"
	src="https://res.cloudinary.com/your-cloud-name-here/image/fetch/q_auto,f_auto,w_640/https://cool.img/here.jpg"
	alt="A cool image"
/>
```

The resulting `<img>`s are “responsive” in the following ways:

- Using `srcset` and `sizes`, they’ll deliver [variable-resolution images](https://cloudinary.com/blog/responsive_images_guide_part_2_variable_image_resolution), which respond to variable layout widths and screen densities.
- Using `f_auto`, they’ll deliver [variable-format images](https://cloudinary.com/blog/responsive_images_guide_part_3_variable_image_encoding#variable_formats), which  adapt based on both browser support and image content.
- Using `q_auto`, they’ll deliver [variable-quality images](https://cloudinary.com/blog/responsive_images_guide_part_3_variable_image_encoding#variable_quality_compression), which:
	- strike a [consistent balance](https://cloudinary.com/blog/the_holy_grail_of_image_optimization_or_balancing_visual_quality_and_file_size) between *perceived* quality and file-size
	- respond to user preferences, dialing quality and file size way down in the presence of the [`Save-Data` header](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/save-data/).

## Installation

The plugin is [available on npm](https://www.npmjs.com/package/eleventy-plugin-respimg).

```
npm install eleventy-plugin-respimg
```

After `npm install`ing, open up your Eleventy config file (probably `.eleventy.js`) and

1. require it
2. set the mandatory config parameters, and 
3. use `addPlugin`.

```
; ①
const pluginRespimg = require( "eleventy-plugin-respimg" );

module.exports = function( eleventyConfig ) {

	; ②
	eleventyConfig.cloudinaryCloudName = 'your-cloud-name-here';
	eleventyConfig.srcsetWidths = [ 320, 640, 960, 1280, 1600, 1920, 2240, 2560 ];
	eleventyConfig.fallbackWidth = 640;

	; ③
	eleventyConfig.addPlugin( pluginRespimg );
	
};
````

Also! Make sure that the domains where you’ll be hosting your originals are whitelisted in your Cloudinary settings, under “Security » Allowed fetch domains”. Alternatively, leave the field blank, and Cloudinary will happily [`fetch`](https://cloudinary.com/documentation/fetch_remote_images#remote_image_fetch_url) from any domain. 

## Example

[Here’s a quick, actual example](https://github.com/eeeps/eleventy-respimg-example), that uses a couple of these in a couple of contexts.

## TODO

- [ ] limit `srcset` breakpoints to the intrinsic width of the original (don’t let Cloudinary upscale)
- [ ] allow relative `src` paths
- [ ] don’t `fetch` images that are already in your Cloudinary media library
- [ ] smarter `srcset` breakpoints, using Cloudinary’s [automatic responsive image breakpoint features](http://www.responsivebreakpoints.com)
- [ ] automatic `sizes`‽ (probably using Puppeteer and [@ausi’s logic](https://github.com/ausi/respimagelint/blob/master/src/util/computeSizesAttribute.js)?)
- [ ] what should it do with animated Gifs?


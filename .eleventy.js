const htmlmin = require("html-minifier");

// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

module.exports = function (eleventyConfig) {
  // Add filters
  eleventyConfig.addFilter('dateFilter', dateFilter);
  eleventyConfig.addFilter('w3DateFilter', w3DateFilter);

  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addWatchTarget("./_tmp/style.css");

  eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });

  // Add shortcode for versions
  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  // Returns a collection of blog posts in reverse date order
  eleventyConfig.addCollection('blog', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
  });

  // Returns minified HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // Set template engine and make 11ty watch dist
  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};

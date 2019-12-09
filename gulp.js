/// <binding />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-clean-css"),
    uglify = require("gulp-uglify"),
    randomstring = require("randomstring"),
    replace = require('gulp-string-replace'),
    gutil = require('gulp-util'),
    deploy = require("deploy-azure-cdn"),
    gulpSequence = require('gulp-sequence'),
    dateFormat = require('dateformat');

var now = new Date();

var paths = {
    webroot: "./wwwroot/"
};



paths.randomString = randomstring.generate(12);
paths.assets = paths.webroot + "assets/";
paths.commonWebJs = paths.webroot + "js/web/common/*.js";
paths.commonMobileJs = paths.webroot + "js/mobile/common/*.js";


paths.concatListingWebJsFileName = "auto-gen-web-listing-" + paths.randomString + ".min.js";
paths.concatListingMobileJsFileName = "auto-gen-mobile-listing-" + paths.randomString + ".min.js";

paths.commonWebCss = paths.webroot + "css/web/common/*.css";
paths.commonMobileCss = paths.webroot + "css/mobile/common/*.css";


paths.listingWebJs = paths.webroot + "js/web/listing/*.js";
paths.concatListingWebJsDest = paths.assets + paths.concatListingWebJsFileName;
paths.concatListingWebJsDest2 = "./wwwroot/js/dev/listing-web.js";

paths.listingMobileJs = paths.webroot + "js/mobile/listing/*.js";
paths.concatListingMobileJsDest = paths.assets + paths.concatListingMobileJsFileName;
paths.concatListingMobileJsDest2 = "./wwwroot/js/dev/listing-mobile.js";


//new listing v2

paths.commonWebV2Js = paths.webroot + "js/v2/common/*.js";
paths.commonMobileV2Js = paths.webroot + "js/v2/common/*.js";


paths.concatListingWebV2JsFileName = "auto-gen-web-listingv2-" + paths.randomString + ".min.js";
paths.concatListingMobileV2JsFileName = "auto-gen-mobile-listingv2-" + paths.randomString + ".min.js";
paths.concatListingLcfV2WebJsFileName = "auto-gen-lcfv2-web-" + paths.randomString + ".min.js";
paths.concatListingLcfV2MobileJsFileName = "auto-gen-lcfv2-mobile-" + paths.randomString + ".min.js";
paths.concatListingCostingJsFileName = "auto-gen-costing-" + paths.randomString + ".min.js";


paths.listingWebV2Js = paths.webroot + "js/v2/listing/web/*.js";
paths.concatListingWebV2JsDest = paths.assets + paths.concatListingWebV2JsFileName;
paths.concatListingWebV2JsDest2 = "./wwwroot/js/dev/listingv2-web.js";

paths.listingMobileV2Js = paths.webroot + "js/v2/listing/mobile/*.js";
paths.concatListingMobileV2JsDest = paths.assets + paths.concatListingMobileV2JsFileName;
paths.concatListingMobileV2JsDest2 = "./wwwroot/js/dev/listingv2-mobile.js";


/**** AdListings Scripts Bundling and Minification Web****/

paths.commonAdListingsWebJS = paths.webroot + "js/v2/common/*.js";
paths.bsnsListingWebJS = paths.webroot + "js/v2/listing/web/*.js";
paths.adListingWebJS = paths.webroot + "js/web/adlistings/*.js";


paths.concatAdListingWebJSFileName = "auto-gen-web-adlistings-" + paths.randomString + ".min.js";
paths.concatAdListingWebJSDest = paths.assets + paths.concatAdListingWebJSFileName;
paths.concatAdListingWebJSDest2 = "./wwwroot/js/dev/adlisting-web.js";

/**** AdListings Scripts Bundling and Minification Web****/


/**** AdListings Scripts Bundling and Minification Mobile****/

paths.commonAdListingsMobileJS = paths.webroot + "js/v2/common/*.js";
paths.bsnsListingMobileJS = paths.webroot + "js/v2/listing/mobile/*.js";
paths.adListingMobileJS = paths.webroot + "js/web/adlistings/*.js";

paths.concatAdListingMobileJSFileName = "auto-gen-mobile-adlistings-" + paths.randomString + ".min.js";
paths.concatAdListingMobileJSDest = paths.assets + paths.concatAdListingMobileJSFileName;
paths.concatAdListingMobileJSDest2 = "./wwwroot/js/dev/adlisting-mobile.js";

/**** AdListings Scripts Bundling and Minification Mobile ****/

/**** AdDetails Scripts Bundling and Minification Web****/

paths.commonAdDetailWebJS = paths.webroot + "js/v2/common/*.js";
//paths.bsnsAdDetailWebJS = paths.webroot + "js/v2/listing/web/*.js";
//paths.adDetailMediaJs = paths.webroot + "js/web/adlistings/06-media-gallery.js";
paths.adDetailWebJS = paths.webroot + "js/web/addetail/*.js";

paths.concatAdDetailWebJSFileName = "auto-gen-web-addetail-" + paths.randomString + ".min.js";
paths.concatAdDetailWebJSDest = paths.assets + paths.concatAdDetailWebJSFileName;
paths.concatAdDetailWebJSDest2 = "./wwwroot/js/dev/addetail-web.js";

/**** AdDetails Scripts Bundling and Minification Web****/

/**** AdDetails Scripts Bundling and Minification Mobile****/

paths.commonAdDetailMobileJS = paths.webroot + "js/v2/common/*.js";
paths.bsnsAdDetailMobileJS = paths.webroot + "js/v2/listing/mobile/*.js";
//paths.adDetailMediaMobileJs = paths.webroot + "js/web/adlistings/06-media-gallery.js";
paths.adDetailMobileJS = paths.webroot + "js/web/addetail/*.js";

paths.concatAdDetailMobileJSFileName = "auto-gen-mobile-addetail-" + paths.randomString + ".min.js";
paths.concatAdDetailMobileJSDest = paths.assets + paths.concatAdDetailMobileJSFileName;
paths.concatAdDetailMobileJSDest2 = "./wwwroot/js/dev/addetail-mobile.js";

/**** AdDetails Scripts Bundling and Minification Mobile****/



paths.lcfV2Js = [
    paths.webroot + 'js/v2/common/01-base.js',
    paths.webroot + 'js/v2/common/10-smultiselect-v2.js',
    paths.webroot + 'js/v2/common/bootstrap-datepicker.js',
    paths.webroot + 'js/v2/common/17-gap-analysis-yp.js',
    paths.webroot + 'js/v2/common/07-saccordion.js',
    paths.webroot + 'js/v2/common/12-scarousel.js',
    paths.webroot + 'js/v2/common/lcf.js'
    //paths.webroot + 'js/v2/common/lcfplugin.js'
];

paths.lcfV2MobileJs = [
    paths.webroot + 'js/v2/common/01-base.js',
    paths.webroot + 'js/v2/common/10-smultiselect-v2.js',
    paths.webroot + 'js/v2/common/bootstrap-datepicker.js',
    paths.webroot + 'js/v2/listing/mobile/24-jquery.easing.js',
    paths.webroot + 'js/v2/common/17-gap-analysis-yp.js',
    paths.webroot + 'js/v2/common/12-scarousel.js',
    paths.webroot + 'js/v2/common/lcf.js'
    //paths.webroot + 'js/v2/common/lcfplugin.js'
];

paths.costingJs = [
    paths.webroot + 'js/v2/common/01-base.js',
    paths.webroot + 'js/v2/common/02-svalidate.js',
    paths.webroot + 'js/v2/common/07-saccordion.js',
    paths.webroot + 'js/v2/common/17-gap-analysis-yp.js',
    paths.webroot + 'js/v2/common/04-stabs.js',
    paths.webroot + 'js/v2/costing/paintingcosting.js',
    paths.webroot + 'js/v2/common/16-get-verified.js',
    paths.webroot + 'js/v2/common/15-LcCommon.js'
];

paths.concatListingLcfV2WebJsDest = paths.assets + paths.concatListingLcfV2WebJsFileName;
paths.concatListingLcfV2WebJsDest2 = "./wwwroot/js/dev/lcfv2-web.js";

paths.concatListingLcfV2MobileJsDest = paths.assets + paths.concatListingLcfV2MobileJsFileName;
paths.concatListingLcfV2MobileJsDest2 = "./wwwroot/js/dev/lcfv2-mobile.js";


paths.concatListingCostingJsDest = paths.assets + paths.concatListingCostingJsFileName;
paths.concatListingCostingJsDest2 = "./wwwroot/js/dev/costing-web.js";


//hubpage&portfolio
paths.commonHubJs = paths.webroot + "js/web/hubcommon/*.js";
paths.commonHubCss = paths.webroot + "css/web/hub/*.css";

paths.concatHubPageJsFileName = "auto-gen-hubpage-" + paths.randomString + ".min.js";
paths.concatPortfolioPageJsFileName = "auto-gen-portfoliopage-" + paths.randomString + ".min.js";
paths.concatArticlePageJsFileName = "auto-gen-articlepage-" + paths.randomString + ".min.js";
paths.concatBlogListPageJsFileName = "auto-gen-bloglistpage-" + paths.randomString + ".min.js";
paths.concatHubPageCsssFileName = "auto-gen-hubpage-" + paths.randomString + ".min.css";
paths.concatPortfolioPageCssFileName = "auto-gen-portfoliopage-" + paths.randomString + ".min.css";

// Articel V1 Start

paths.concatHubPageWebCsssV1FileName = "auto-gen-web-hubpagev1-" + paths.randomString + ".min.css";
paths.concatHubPageMobileCsssV1FileName = "auto-gen-mobile-hubpagev1-" + paths.randomString + ".min.css";

//performance css
paths.performanceCssWeb = [
    paths.webroot + 'css/performance/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css',
    paths.webroot + 'css/v2/listing/2-4-common-sgallery.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/2-8-relatedservices.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css',
    paths.webroot + 'css/v2/listing/3-5-listing.css',
    paths.webroot + 'css/v2/listing/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/web/2-3-common-sdialog.css',
    paths.webroot + 'css/v2/listing/web/2-5-scarousel.css',
    paths.webroot + 'css/v2/listing/web/2-7-categoryking.css',
    paths.webroot + 'css/v2/listing/web/3-5-1-listing.css',
    paths.webroot + 'css/v2/listing/web/2-9-save-to-phone.css',
    paths.webroot + 'css/v2/listing/web/3-7-bottom.css'
].sort();
paths.performanceCssMobile = [
    paths.webroot + 'css/performance/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css',
    paths.webroot + 'css/v2/listing/2-4-common-sgallery.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/2-8-relatedservices.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css',
    paths.webroot + 'css/v2/listing/3-5-listing.css',
    paths.webroot + 'css/v2/listing/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/mobile/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/mobile/2-6-common-spanel.css',
    paths.webroot + 'css/v2/listing/web/2-5-scarousel.css',
    paths.webroot + 'css/v2/listing/mobile/3-5-1-listing.css',
    paths.webroot + 'css/v2/listing/mobile/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/mobile/3-8-mediaquery.css'
].sort();
paths.performanceCssFileName = "auto-gen-web-listing-performance-" + paths.randomString + ".min.css";
paths.performanceCssMobileFileName = "auto-gen-mobile-listing-performance-" + paths.randomString + ".min.css";
paths.performanceCssDest = paths.assets + paths.performanceCssFileName;
paths.performanceCssMobileDest = paths.assets + paths.performanceCssMobileFileName;
paths.performanceCssDest2 = "./wwwroot/css/dev/listing-performance.css";
paths.performanceCssDest3 = "./wwwroot/css/dev/mobile-listing-performance.css";


paths.HubArticelV1WebCss = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/web/2-3-common-sdialog.css'
];

paths.concatHubArticelV1WebCssDest = paths.assets + paths.concatHubPageWebCsssV1FileName;
paths.concatHubArticelV1WebCssDest2 = "./wwwroot/css/dev/hub-articel-web-v1.css";


paths.HubArticelV1MobileCss = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/mobile/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/mobile/2-6-common-spanel.css',
    paths.webroot + 'css/v2/listing/mobile/3-8-mediaquery.css'
];

paths.concatHubArticelV1MobileCssDest = paths.assets + paths.concatHubPageMobileCsssV1FileName;
paths.concatHubArticelV1MobileCssDest2 = "./wwwroot/css/dev/hub-articel-mobile-v1.css";

gulp.task("min:hub-articel-web-v1:css", function () {
    return gulp.src(paths.HubArticelV1WebCss)
        .pipe(concat(paths.concatHubArticelV1WebCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:hub-articel-web-v1:css:dev", function () {
    return gulp.src(paths.HubArticelV1WebCss)
        .pipe(concat(paths.concatHubArticelV1WebCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:performance-web-v1:css", function () {
    return gulp.src(paths.performanceCssWeb)
        .pipe(concat(paths.performanceCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:performance-mobile-v1:css", function () {
    return gulp.src(paths.performanceCssMobile)
        .pipe(concat(paths.performanceCssMobileDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:performance-web-v1:css:dev", function () {
    return gulp.src(paths.performanceCssWeb)
        .pipe(concat(paths.performanceCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:performance-mobile-v1:css:dev", function () {
    return gulp.src(paths.performanceCssMobile)
        .pipe(concat(paths.performanceCssDest3))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("replace:min:performance-web-v1:css", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-web-listing-performance-(.*)\.css/g, paths.performanceCssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});
gulp.task("replace:min:performance-mobile-v1:css", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-mobile-listing-performance-(.*)\.css/g, paths.performanceCssMobileFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:min:performance-web-v1:css:dev", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-web-listing-performance-(.*)\.css/g, paths.performanceCssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:min:performance-mobile-v1:css:dev", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-mobile-listing-performance-(.*)\.css/g, paths.performanceCssMobileFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});


gulp.task("min:hub-articel-mobile-v1:css", function () {
    return gulp.src(paths.HubArticelV1MobileCss)
        .pipe(concat(paths.concatHubArticelV1MobileCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:hub-articel-mobile-v1:css:dev", function () {
    return gulp.src(paths.HubArticelV1MobileCss)
        .pipe(concat(paths.concatHubArticelV1MobileCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});


gulp.task("replace:web:hub-articel-v1:css", function () {
    return gulp.src("./Views/Hub/_HubCssV1.cshtml")
        .pipe(replace(/auto-gen-web-hubpagev1-(.*)\.css/g, paths.concatHubPageWebCsssV1FileName))
        .pipe(gulp.dest('./Views/Hub/'));
});

gulp.task("replace:web:hub-articel-v1:css:dev", function () {
    return gulp.src("./Views/Hub/_HubCssV1.cshtml")
        .pipe(replace(/auto-gen-web-hubpagev1-(.*)-dev/g, paths.concatHubPageWebCsssV1FileName))
        .pipe(gulp.dest('./Views/Hub/'));
});


gulp.task("replace:mobile:hub-articel-v1:css", function () {
    return gulp.src("./Views/Hub/_HubCssV1.cshtml")
        .pipe(replace(/auto-gen-mobile-hubpagev1-(.*)\.css/g, paths.concatHubPageMobileCsssV1FileName))
        .pipe(gulp.dest('./Views/Hub/'));
});

gulp.task("replace:mobile:hub-articel-v1:css:dev", function () {
    return gulp.src("./Views/Hub/_HubCssV1.cshtml")
        .pipe(replace(/auto-gen-mobile-hubpagev1-(.*)-dev/g, paths.concatHubPageMobileCsssV1FileName))
        .pipe(gulp.dest('./Views/Hub/'));
});
// Articel V1 End //


paths.hubPageJs = paths.webroot + "js/web/hub/*.js";
paths.portfolioPageJs = paths.webroot + "js/web/portfolio/*.js";
paths.articlePageJs = paths.webroot + "js/web/blog/*.js";
paths.bloglistPageJs = paths.webroot + "js/web/bloglist/*.js";


paths.hubPageCss = paths.webroot + "css/web/hub/*.css";
paths.portfolioPageCss = paths.webroot + "css/web/portfolio/*.css";


paths.concatHubPageWebCssDest = paths.assets + paths.concatHubPageCsssFileName;
paths.concatHubPageWebCssDest2 = "./wwwroot/css/dev/hub.css";

paths.concatPortfolioPageWebCssDest = paths.assets + paths.concatPortfolioPageCssFileName;
paths.concatPortfolioPageWebCssDest2 = "./wwwroot/css/dev/portfolio.css";

paths.concatHubPageWebJsDest = paths.assets + paths.concatHubPageJsFileName;
paths.concatHubPageWebJsDest2 = "./wwwroot/js/dev/hub.js";

paths.concatPortfolioPageWebJsDest = paths.assets + paths.concatPortfolioPageJsFileName;
paths.concatPortfolioPageWebJsDest2 = "./wwwroot/js/dev/portfolio.js";

paths.concatArticlePageWebJsDest = paths.assets + paths.concatArticlePageJsFileName;
paths.concatArticlePageWebJsDest2 = "./wwwroot/js/dev/article.js";

paths.concatBlogListPageWebJsDest = paths.assets + paths.concatBlogListPageJsFileName;
paths.concatBlogListPageWebJsDest2 = "./wwwroot/js/dev/bloglist.js";

//profile css
paths.concatProfileWebCssFileName = "auto-gen-web-profile-" + paths.randomString + ".min.css";
paths.concatProfileMobileCssFileName = "auto-gen-mobile-profile-" + paths.randomString + ".min.css";

paths.profileWebCss = paths.webroot + "css/web/profile/*.css";
paths.concatProfileWebCssDest = paths.assets + paths.concatProfileWebCssFileName;
paths.concatProfileWebCssDest2 = "./wwwroot/css/dev/profile-web.css";

paths.profileMobileCss = paths.webroot + "css/mobile/profile/*.css";
paths.concatProfileMobileCssDest = paths.assets + paths.concatProfileMobileCssFileName;
paths.concatProfileMobileCssDest2 = "./wwwroot/css/dev/profile-mobile.css";


//profile js
paths.concatProfileWebJsFileName = "auto-gen-web-profile-" + paths.randomString + ".min.js";
paths.concatProfileMobileJsFileName = "auto-gen-mobile-profile-" + paths.randomString + ".min.js";

//start profile v2 with offers
//JS
paths.concatProfileV2WebJsFileName = "auto-gen-web-profilev2-" + paths.randomString + ".min.js";
paths.concatProfileV2MobileJsFileName = "auto-gen-mobile-profilev2-" + paths.randomString + ".min.js";
//paths.concatProfileV2MobileJsFileName = "auto-gen-mobile-profilev2-" + paths.randomString + ".min.js";
paths.profileV2CommonJs = [
    paths.webroot + 'js/v2/common/01-base.js',
    paths.webroot + 'js/v2/common/02-svalidate.js',
    paths.webroot + 'js/v2/common/04-stabs.js',
    paths.webroot + 'js/v2/common/07-saccordion.js',
    paths.webroot + 'js/v2/common/08-popover.js',
    paths.webroot + 'js/v2/common/09-scrollspy.js',
    paths.webroot + 'js/v2/common/10-smultiselect-v2.js',
    paths.webroot + 'js/v2/common/bootstrap-datepicker.js',
    paths.webroot + 'js/v2/common/12-scarousel.js',
    paths.webroot + 'js/v2/common/13-googletag.js',
    paths.webroot + 'js/v2/common/14-get-directions.js',
    paths.webroot + 'js/v2/common/15-LcCommon.js',
    paths.webroot + 'js/v2/common/16-get-verified.js',
    paths.webroot + 'js/v2/common/17-gap-analysis-yp.js',
    paths.webroot + 'js/v2/common/21-schema.js',
    paths.webroot + 'js/v2/common/23-blogdetails.js'

];
paths.profileV2WebJs = [
    paths.webroot + 'js/v2/common/01-base.js',
    paths.webroot + 'js/v2/profile/02-svalidate_profile.js',
    paths.webroot + 'js/v2/common/04-stabs.js',
    paths.webroot + 'js/v2/common/07-saccordion.js',
    paths.webroot + 'js/v2/common/08-popover.js',
    paths.webroot + 'js/v2/common/09-scrollspy.js',
    paths.webroot + 'js/v2/common/10-smultiselect-v2.js',
    paths.webroot + 'js/v2/common/bootstrap-datepicker.js',
    paths.webroot + 'js/v2/common/12-scarousel.js',
    paths.webroot + 'js/v2/common/13-googletag.js',
    paths.webroot + 'js/v2/common/14-get-directions.js',
    paths.webroot + 'js/v2/common/15-LcCommon.js',
    paths.webroot + 'js/v2/common/16-get-verified.js',
    paths.webroot + 'js/v2/common/17-gap-analysis-yp.js',
    paths.webroot + 'js/v2/common/23-blogdetails.js',
    paths.webroot + 'js/v2/profile/06-sgallery-v1.js',
    paths.webroot + 'js/v2/profile/20-Lcf-web.js',
    paths.webroot + 'js/v2/profile/23-profile_exclusiveresponse.js',
    paths.webroot + 'js/v2/profile/web/Profile-v2.js',
    paths.webroot + 'js/v2/profile/25-schema_profile.js',
    paths.webroot + 'js/v2/profile/common_profilev2.js',
    paths.webroot + 'js/v2/profile/imagelazy.min.js'



];
paths.profileV2MobileJs = [
    paths.webroot + 'js/v2/common/01-base.js',
    paths.webroot + 'js/v2/profile/02-svalidate_profile.js',
    paths.webroot + 'js/v2/common/04-stabs.js',
    paths.webroot + 'js/v2/common/07-saccordion.js',
    paths.webroot + 'js/v2/common/08-popover.js',
    paths.webroot + 'js/v2/common/09-scrollspy.js',
    paths.webroot + 'js/v2/common/10-smultiselect-v2.js',
    paths.webroot + 'js/v2/common/bootstrap-datepicker.js',
    paths.webroot + 'js/v2/common/12-scarousel.js',
    paths.webroot + 'js/v2/common/13-googletag.js',
    paths.webroot + 'js/v2/common/14-get-directions.js',
    paths.webroot + 'js/v2/common/15-LcCommon.js',
    paths.webroot + 'js/v2/common/16-get-verified.js',
    paths.webroot + 'js/v2/common/17-gap-analysis-yp.js',
    paths.webroot + 'js/v2/common/23-blogdetails.js',
    paths.webroot + 'js/v2/profile/06-sgallery-v1.js',
    paths.webroot + 'js/v2/profile/20-Lcf-web.js',
    paths.webroot + 'js/v2/profile/23-profile_exclusiveresponse.js',
    paths.webroot + 'js/v2/profile/mobile/M-Profile-v2.js',
    paths.webroot + 'js/v2/profile/mobile/spanel.js',
    paths.webroot + 'js/v2/profile/25-schema_profile.js',
    paths.webroot + 'js/v2/profile/common_profilev2.js',
    paths.webroot + 'js/v2/profile/imagelazy.min.js'
];
paths.concatProfileV2WebJsDest = paths.assets + paths.concatProfileV2WebJsFileName;
paths.concatProfileV2WebJsDest2 = "./wwwroot/js/dev/profilev2-web.js";

paths.concatProfileV2MobileJsDest = paths.assets + paths.concatProfileV2MobileJsFileName;
paths.concatProfileV2MobileJsDest2 = "./wwwroot/js/dev/profilev2-mobile.js";

//**********CSS*************//

paths.profileV2CommonCss = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-3-common.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/profile/otp.css',
    paths.webroot + 'css/v2/profile/2-4-common-sgallery-v1.css',
    paths.webroot + 'css/v2/profile/ad-details-v1.css',
    paths.webroot + 'css/v2/profile/common-details-v1.css'
];
paths.profileV2WebCss = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-3-common.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/web/2-9-save-to-phone.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/web/2-3-common-sdialog.css',
    paths.webroot + 'css/v2/listing/web/3-7-bottom.css',
    paths.webroot + 'css/v2/profile/otp.css',
    paths.webroot + 'css/v2/profile/2-4-common-sgallery-v1.css',
    paths.webroot + 'css/v2/profile/ad-details-v1.css',
    paths.webroot + 'css/v2/profile/common-details-v1.css',
    paths.webroot + 'css/v2/listing/6-2-response.css',
    paths.webroot + "css/v3/common/3-3-listings-card.css"

];
paths.profileV2MobileCss = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-3-common.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/web/2-9-save-to-phone.css',
    paths.webroot + 'css/v2/listing/mobile/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/mobile/2-6-common-spanel.css',
    paths.webroot + 'css/v2/profile/otp.css',
    paths.webroot + 'css/v2/profile/2-4-common-sgallery-v1.css',
    paths.webroot + 'css/v2/profile/ad-details-v1.css',
    paths.webroot + 'css/v2/profile/common-details-v1.css',
    paths.webroot + 'css/v2/listing/mobile/3-8-mediaquery.css',
    paths.webroot + 'css/v2/profile/mobile/3.9-mediaquery.css',
    paths.webroot + 'css/v2/listing/6-2-response.css',
    paths.webroot + "css/v3/common/3-3-listings-card.css"
];

paths.profileV2PwaCss = [
    paths.webroot + 'css/v2/profile/mobile/spl/inline.css',
    paths.webroot + 'css/v2/profile/mobile/spl/pwa.css',
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-3-common.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/web/2-9-save-to-phone.css',
    paths.webroot + 'css/v2/listing/mobile/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/mobile/2-6-common-spanel.css',
    paths.webroot + 'css/v2/profile/otp.css',
    paths.webroot + 'css/v2/profile/2-4-common-sgallery-v1.css',
    paths.webroot + 'css/v2/profile/ad-details-v1.css',
    paths.webroot + 'css/v2/profile/common-details-v1.css',
    paths.webroot + 'css/v2/listing/mobile/3-8-mediaquery.css',
    paths.webroot + 'css/v2/profile/mobile/3.9-mediaquery.css',
    paths.webroot + 'css/v2/listing/6-2-response.css',
    paths.webroot + "css/v3/common/3-3-listings-card.css"
];

paths.concatProfileV2WebCssFileName = "auto-gen-web-profilev2-" + paths.randomString + ".min.css";
paths.concatProfileV2MobileCssFileName = "auto-gen-mobile-profilev2-" + paths.randomString + ".min.css";
paths.concatProfileV2PwaCssFileName = "auto-gen-pwa-profilev2-" + paths.randomString + ".min.css";


paths.concatProfileV2WebCssDest = paths.assets + paths.concatProfileV2WebCssFileName;
paths.concatProfileV2WebCssDest2 = "./wwwroot/css/dev/profilev2-web.css";


paths.concatProfileV2MobileCssDest = paths.assets + paths.concatProfileV2MobileCssFileName;
paths.concatProfileV2MobileCssDest2 = "./wwwroot/css/dev/profilev2-mobile.css";

paths.concatProfileV2PwaCssDest = paths.assets + paths.concatProfileV2PwaCssFileName;
paths.concatProfileV2PwaCssDest2 = "./wwwroot/css/dev/profilev2-pwa.css";

//end



//start bloghomepage
//JS
paths.concatBlogHomeWebJsFileName = "auto-gen-web-bloghome-" + paths.randomString + ".min.js";

paths.bloghomeWebJs = [
    paths.webroot + 'js/v2/common/01-base.js',
    paths.webroot + 'js/v2/common/02-svalidate.js',
    paths.webroot + 'js/v2/common/04-stabs.js',
    paths.webroot + 'js/v2/common/07-saccordion.js',
    paths.webroot + 'js/v2/common/08-popover.js',
    paths.webroot + 'js/v2/common/09-scrollspy.js',
    paths.webroot + 'js/v2/common/12-scarousel.js',
    paths.webroot + 'js/v2/common/17-gap-analysis-yp.js',
    paths.webroot + 'js/v2/common/21-schema.js',
    paths.webroot + 'js/v2/bloghomepage/blogpage.js'
];
paths.concatBlogHomeWebJsDest = paths.assets + paths.concatBlogHomeWebJsFileName;
paths.concatBlogHomeWebJsDest2 = "./wwwroot/js/dev/bloghome-web.js";

/*paths.concatBlogHomeMobileJsFileName = "auto-gen-mobile-bloghome-" + paths.randomString + ".min.js";
paths.bloghomeMobileJs = [
   paths.webroot + 'js/v2/common/01-base.js',
   paths.webroot + 'js/v2/common/02-svalidate.js',
   paths.webroot + 'js/v2/common/04-stabs.js',
   paths.webroot + 'js/v2/common/07-saccordion.js',
   paths.webroot + 'js/v2/common/08-popover.js',
   paths.webroot + 'js/v2/common/09-scrollspy.js',  
   paths.webroot + 'js/v2/common/12-scarousel.js',
   paths.webroot + 'js/v2/common/17-gap-analysis-yp.js',
   paths.webroot + 'js/v2/common/21-schema.js' 
   paths.webroot + 'js/v2/bloghomepage/blogpage.js'
];
paths.concatBlogHomeMobileJsDest = paths.assets + paths.concatBlogHomeMobileJsFileName;
paths.concatBlogHomeMobileJsDest2 = "./wwwroot/js/dev/bloghome-mobile.js";*/
//end

//Static Page 


paths.concatStaticWebCSSFileName = "auto-gen-web-staticpage-" + paths.randomString + ".min.css";
paths.concatStaticMobileCSSFileName = "auto-gen-mobile-staticpage-" + paths.randomString + ".min.css";
paths.concatStaticPWACSSFileName = "auto-gen-pwa-staticpage-" + paths.randomString + ".min.css";

paths.staticWebCss = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-8-relatedservices.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/web/2-5-scarousel.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css',
    paths.webroot + 'css/v2/listing/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/web/2-3-common-sdialog.css'
];

paths.concatStaticPageWebDest = paths.assets + paths.concatStaticWebCSSFileName;
paths.concatStaticPageWebDest2 = "./wwwroot/css/dev/staticpage-web.css";

paths.staticMobileCss = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-8-relatedservices.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/web/2-5-scarousel.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css',
    paths.webroot + 'css/v2/listing/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/mobile/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/mobile/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/mobile/2-6-common-spanel.css',
    paths.webroot + 'css/v2/listing/mobile/3-8-mediaquery.css'
];

paths.concatStaticPageMobileDest = paths.assets + paths.concatStaticMobileCSSFileName;
paths.concatStaticPageMobileDest2 = "./wwwroot/css/dev/staticpage-mobile.css";

paths.staticPWACss = [
    paths.webroot + 'css/v2/listing/mobile/spl/pwa.css',
    paths.webroot + 'css/v2/listing/mobile/spl/inline.css',
    paths.webroot + 'css/v2/listing/mobile/pwastaticpage/staticpwa.css',
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-8-relatedservices.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/web/2-5-scarousel.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css',
    paths.webroot + 'css/v2/listing/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/mobile/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/mobile/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/mobile/2-6-common-spanel.css',
    paths.webroot + 'css/v2/listing/mobile/3-8-mediaquery.css'
];

paths.concatStaticPagePWADest = paths.assets + paths.concatStaticPWACSSFileName;
paths.concatStaticPagePWADest2 = "./wwwroot/css/dev/staticpage-pwa.css";

// End 


//Costing start

paths.costingCSSWeb = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css',
    paths.webroot + 'css/v2/listing/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/web/2-3-common-sdialog.css',
    paths.webroot + 'css/v2/listing/web/2-9-save-to-phone.css',
    paths.webroot + 'css/v2/listing/web/3-7-bottom.css',
    paths.webroot + 'css/v2/listing/6-2-response.css'
];

paths.costingCSSMobile = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css',
    paths.webroot + 'css/v2/listing/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/mobile/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/mobile/2-6-common-spanel.css',
    paths.webroot + 'css/v2/listing/mobile/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/mobile/3-8-mediaquery.css',
    paths.webroot + 'css/v2/listing/6-2-response.css'
];


paths.costingCSSPWa = [
    paths.webroot + 'css/v2/listing/mobile/spl/pwa.css',
    paths.webroot + 'css/v2/listing/mobile/spl/inline.css',
    paths.webroot + 'css/v2/listing/mobile/costing/pwa-costing-tool.css',
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css',
    paths.webroot + 'css/v2/listing/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/mobile/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/mobile/2-6-common-spanel.css',
    paths.webroot + 'css/v2/listing/mobile/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/mobile/3-8-mediaquery.css',
    paths.webroot + 'css/v2/listing/6-2-response.css'
];

paths.concatCostingWebCSSFileName = "auto-gen-web-costing-" + paths.randomString + ".min.css";
paths.concatCostingMobileCSSFileName = "auto-gen-mobile-costing-" + paths.randomString + ".min.css";
paths.concatCostingPWACSSFileName = "auto-gen-pwa-costing-" + paths.randomString + ".min.css";

paths.concatCostingPageWebDest = paths.assets + paths.concatCostingWebCSSFileName;
paths.concatCostingPageWebDest2 = "./wwwroot/css/dev/cositng-web.css";

paths.concatCostingPageMobileDest = paths.assets + paths.concatCostingMobileCSSFileName;
paths.concatCostingPageMobileDest2 = "./wwwroot/css/dev/costing-mobile.css";

paths.concatCostingPagePWADest = paths.assets + paths.concatCostingPWACSSFileName;
paths.concatCostingPagePWADest2 = "./wwwroot/css/dev/costing-pwa.css";

gulp.task("min:costing-web:css:dev", function () {
    return gulp.src(paths.costingCSSWeb)
        .pipe(concat(paths.concatCostingPageWebDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:costing-web:css", function () {
    return gulp.src(paths.costingCSSWeb)
        .pipe(concat(paths.concatCostingPageWebDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:costing-mobile:css:dev", function () {
    return gulp.src(paths.costingCSSMobile)
        .pipe(concat(paths.concatCostingPageMobileDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:costing-mobile:css", function () {
    return gulp.src(paths.costingCSSMobile)
        .pipe(concat(paths.concatCostingPageMobileDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:costing-pwa:css:dev", function () {
    return gulp.src(paths.costingCSSPWa)
        .pipe(concat(paths.concatCostingPagePWADest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:costing-pwa:css", function () {
    return gulp.src(paths.costingCSSPWa)
        .pipe(concat(paths.concatCostingPagePWADest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("replace:costing:css", function () {
    return gulp.src("./Views/Shared/V2/_CostingCss.cshtml")
        .pipe(replace(/auto-gen-web-costing-(.*)\.css/g, paths.concatCostingWebCSSFileName))
        .pipe(replace(/auto-gen-mobile-costing-(.*)\.css/g, paths.concatCostingMobileCSSFileName))
        .pipe(replace(/auto-gen-pwa-costing-(.*)\.css/g, paths.concatCostingPWACSSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});
//Costing End


//offer booking pwa
paths.offerbookingCSS = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/6-2-response.css'
];

paths.concatofferbookingCSSFileName = "auto-gen-pwa-offerbooking-" + paths.randomString + ".min.css";

paths.concatofferbookingCSSDest = paths.assets + paths.concatofferbookingCSSFileName;
paths.concatofferbookingCSSDest2 = "./wwwroot/css/dev/pwa-offerbooking.css";


gulp.task("min:offerbooking:css:dev", function () {
    return gulp.src(paths.offerbookingCSS)
        .pipe(concat(paths.concatofferbookingCSSDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:offerbooking:css", function () {
    return gulp.src(paths.offerbookingCSS)
        .pipe(concat(paths.concatofferbookingCSSDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

paths.offerbookingJS = [
    paths.webroot + 'js/v2/common/01-base.js',
    paths.webroot + 'js/v2/common/02-svalidate.js',
    paths.webroot + 'js/v2/common/17-gap-analysis-yp.js',
    paths.webroot + 'js/v2/common/15-LcCommon.js',
    paths.webroot + 'js/v2/common/16-get-verified.js',
    paths.webroot + 'js/v2/common/bootstrap-datepicker.js',
    paths.webroot + 'js/v2/offersbooking/offers.js'
];


paths.concatofferbookingJSFileName = "auto-gen-pwa-offerbooking-" + paths.randomString + ".min.js";

paths.concatofferbookingJSDest = paths.assets + paths.concatofferbookingJSFileName;
paths.concatofferbookingJSDest2 = "./wwwroot/js/dev/pwa-offerbooking.js";

gulp.task("min:offerbooking:js:dev", function () {
    return gulp.src(paths.offerbookingJS, { base: "./" })
        .pipe(concat(paths.concatofferbookingJSDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:offerbooking:js", function () {
    return gulp.src(paths.offerbookingJS, { base: "./" })
        .pipe(concat(paths.concatofferbookingJSDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("replace:offerbooking:css", function () {
    return gulp.src("./Views/GetLcf/_offerbookingcss.cshtml")
        .pipe(replace(/auto-gen-pwa-offerbooking-(.*).css/g, paths.concatofferbookingCSSFileName))
        .pipe(gulp.dest('./Views/GetLcf/'));
});

gulp.task("replace:offerbooking:script", function () {
    return gulp.src("./Views/GetLcf/_offerbookingscript.cshtml")
        .pipe(replace(/auto-gen-pwa-offerbooking-(.*).js/g, paths.concatofferbookingJSFileName))
        .pipe(gulp.dest('./Views/GetLcf/'));
});

gulp.task("offerbooking-dev", gulpSequence("min:offerbooking:css:dev", "min:offerbooking:js:dev", "replace:offerbooking:css", "replace:offerbooking:script"));
gulp.task("offerbooking-live", gulpSequence("min:offerbooking:css", "min:offerbooking:js", "replace:offerbooking:css", "replace:offerbooking:script"));

//offer booking pwa end

paths.profileWebJs = paths.webroot + "js/web/profile/*.js";
paths.concatProfileWebJsDest = paths.assets + paths.concatProfileWebJsFileName;
paths.concatProfileWebJsDest2 = "./wwwroot/js/dev/profile-web.js";

paths.profileMobileJs = paths.webroot + "js/mobile/profile/*.js";
paths.concatProfileMobileJsDest = paths.assets + paths.concatProfileMobileJsFileName;
paths.concatProfileMobileJsDest2 = "./wwwroot/js/dev/profile-mobile.js";






paths.concatWebCssFileName = "auto-gen-web-" + paths.randomString + ".min.css";
paths.concatMobileCssFileName = "auto-gen-mobile-" + paths.randomString + ".min.css";

paths.concatListingWebCssFileName = "auto-gen-web-listing-" + paths.randomString + ".min.css";
paths.concatListingMobileCssFileName = "auto-gen-mobile-listing-" + paths.randomString + ".min.css";

paths.listingWebCss = paths.webroot + "css/web/listing/*.css";
paths.concatListingWebCssDest = paths.assets + paths.concatListingWebCssFileName;
paths.concatListingWebCssDest2 = "./wwwroot/css/dev/listing-web.css";

paths.listingMobileCss = paths.webroot + "css/mobile/listing/*.css";
paths.concatListingMobileCssDest = paths.assets + paths.concatListingMobileCssFileName;
paths.concatListingMobileCssDest2 = "./wwwroot/css/dev/listing-mobile.css";


//listingv2
paths.concatListingWebV2CssFileName = "auto-gen-web-listingv2-" + paths.randomString + ".min.css";
paths.listingWebV2Css = [paths.webroot + "css/v2/listing/*.css", paths.webroot + "css/v2/listing/web/*.css"].sort();
paths.concatListingWebV2CssDest = paths.assets + paths.concatListingWebV2CssFileName;
paths.concatListingWebV2CssDest2 = "./wwwroot/css/dev/listingv2-web.css";
paths.concatListingLcfV2WebCssFileName = "auto-gen-lcfv2-web-" + paths.randomString + ".min.css";
paths.concatListingLcfV2MobileCssFileName = "auto-gen-lcfv2-mobile-" + paths.randomString + ".min.css";

paths.concatListingMobileV2CssFileName = "auto-gen-mobile-listingv2-" + paths.randomString + ".min.css";
paths.listingMobileV2Css = [paths.webroot + "css/v2/listing/*.css", paths.webroot + "css/v2/listing/mobile/*.css"].sort();
paths.concatListingMobileV2CssDest = paths.assets + paths.concatListingMobileV2CssFileName;
paths.concatListingMobileV2CssDest2 = "./wwwroot/css/dev/listingv2-mobile.css";


/*** Ad Listings WEB*****/

paths.adListingWebCSS = [paths.webroot + "css/v2/listing/*.css", paths.webroot + "css/v2/listing/web/*.css", paths.webroot + "css/web/adlistings/*.css", paths.webroot + "css/v3/common/3-3-listings-card.css"].sort();
paths.concatAdListingWebCssFileName = "auto-gen-web-adlistings-" + paths.randomString + ".min.css";
paths.concatAdListingWebCSSDest = paths.assets + paths.concatAdListingWebCssFileName;
paths.concatAdListingWebCSSDest2 = "./wwwroot/css/dev/adlistings-web.css";

/*** Ad Listings WEB*****/

/*** Ad Listings Mobile*****/

paths.adListingMobileCSS = [paths.webroot + "css/v2/listing/*.css", paths.webroot + "css/v2/listing/mobile/*.css", paths.webroot + "css/web/adlistings/*.css", paths.webroot + "css/v3/common/3-3-listings-card.css"].sort();
paths.concatAdListingMobileCssFileName = "auto-gen-mobile-adlistings-" + paths.randomString + ".min.css";
paths.concatAdListingMobileCSSDest = paths.assets + paths.concatAdListingMobileCssFileName;
paths.concatAdListingMobileCSSDest2 = "./wwwroot/css/dev/adlistings-mobile.css";

/*** Ad Listings Mobile*****/

/*** Ad Detail WEB & Mobile Styles*****/
paths.adDetailWebCSS = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/2-4-common-sgallery.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css',
    paths.webroot + 'css/v2/listing/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/6-2-response.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/web/2-3-common-sdialog.css',
    paths.webroot + 'css/v2/listing/web/2-5-scarousel.css',
    paths.webroot + 'css/v2/listing/web/2-9-save-to-phone.css',
    paths.webroot + 'css/v2/listing/web/3-7-bottom.css',
    paths.webroot + 'css/web/adlistings/nouislider.css',
    paths.webroot + 'css/web/addetail/1-1-addetail.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css'
].sort();

paths.concatAdDetailWebCssFileName = "auto-gen-web-addetail-" + paths.randomString + ".min.css";
paths.concatAdDetailWebCSSDest = paths.assets + paths.concatAdDetailWebCssFileName;
paths.concatAdDetailWebCSSDest2 = "./wwwroot/css/dev/addetail-web.css";

paths.adDetailMobileCSS = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/2-4-common-sgallery.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css',
    paths.webroot + 'css/v2/listing/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/6-2-response.css',
    paths.webroot + 'css/v2/listing/mobile/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/mobile/2-6-common-spanel.css',
    paths.webroot + 'css/v2/listing/web/2-5-scarousel.css',
    paths.webroot + 'css/v2/listing/mobile/3-5-1-listing.css',
    paths.webroot + 'css/v2/listing/mobile/3-8-mediaquery.css',
    paths.webroot + 'css/v2/listing/web/3-7-bottom.css',
    paths.webroot + 'css/web/adlistings/nouislider.css',
    paths.webroot + 'css/web/addetail/1-1-addetail.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css'
].sort();

paths.concatAdDetailMobileCssFileName = "auto-gen-mobile-addetail-" + paths.randomString + ".min.css";
paths.concatAdDetailMobileCSSDest = paths.assets + paths.concatAdDetailMobileCssFileName;
paths.concatAdDetailMobileCSSDest2 = "./wwwroot/css/dev/addetail-mobile.css";


paths.adDetailMobilePwaCSS = [
    paths.webroot + 'css/v2/listing/mobile/spl/inline.css',
    paths.webroot + 'css/v2/listing/mobile/spl/pwa.css',
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/2-4-common-sgallery.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css',
    paths.webroot + 'css/v2/listing/3-6-seo-blocks.css',
    paths.webroot + 'css/v2/listing/6-2-response.css',
    paths.webroot + 'css/v2/listing/mobile/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/mobile/2-6-common-spanel.css',
    paths.webroot + 'css/v2/listing/web/2-5-scarousel.css',
    paths.webroot + 'css/v2/listing/mobile/3-5-1-listing.css',
    paths.webroot + 'css/v2/listing/mobile/3-8-mediaquery.css',
    paths.webroot + 'css/v2/listing/web/3-7-bottom.css',
    paths.webroot + 'css/web/adlistings/nouislider.css',
    paths.webroot + 'css/web/addetail/1-1-addetail.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css'
].sort();

paths.concatAdDetailMobilePwaCssFileName = "auto-gen-mobile-pwa-addetail-" + paths.randomString + ".min.css";
paths.concatAdDetailMobilePwaCSSDest = paths.assets + paths.concatAdDetailMobilePwaCssFileName;
paths.concatAdDetailMobilePwaCSSDest2 = "./wwwroot/css/dev/addetail-mobile-pwa.css";
/*** Ad Detail WEB & Mobile Styles*****/

/*Profile Common css*/
paths.profileCommonWebCSS = [
    paths.webroot + 'css/v3/common/1-1-fonts.css',
    paths.webroot + 'css/v3/common/1-2-base.css',
    paths.webroot + 'css/v3/common/1-3-header.css',
    paths.webroot + 'css/v3/common/1-4-footer.css',
    paths.webroot + 'css/v3/common/1-5-breadcrumb.css',
    paths.webroot + 'css/v3/common/1-6-autocomplete.css',
    paths.webroot + 'css/v3/common/1-7-datepicker.css',
    paths.webroot + 'css/v3/common/1-8-carousel.css',
    paths.webroot + 'css/v3/common/1-9-dialog.css',
    paths.webroot + 'css/v3/common/2-1-dropdown.css',
    paths.webroot + 'css/v3/common/2-2-gallery.css',
    paths.webroot + 'css/v3/common/2-4-process.css',
    paths.webroot + 'css/v3/common/2-5-tabs.css',
    paths.webroot + 'css/v3/common/2-6-tooltip.css',
    paths.webroot + 'css/v3/common/2-7-common.css',
    paths.webroot + 'css/v3/common/2-8-banners.css',
    paths.webroot + 'css/v3/common/3-1-input.css',
    paths.webroot + 'css/v3/common/3-2-rating.css',
    paths.webroot + 'css/v3/common/3-5-otp.css',
    paths.webroot + 'css/v3/profile/*.css'
].sort();

paths.concatProfileCommonWebCssFileName = "auto-gen-web-profilecommon-" + paths.randomString + ".min.css";
paths.concatProfileCommonWebCSSDest = paths.assets + paths.concatProfileCommonWebCssFileName;
paths.concatProfileCommonWebCSSDest2 = "./wwwroot/css/dev/profilecommon-web.css";

paths.profileCommonMobileCSS = [
    paths.webroot + 'css/v3/common/1-1-fonts.css',
    paths.webroot + 'css/v3/common/1-2-base.css',
    paths.webroot + 'css/v3/common/1-3-header.css',
    paths.webroot + 'css/v3/common/1-4-footer.css',
    paths.webroot + 'css/v3/common/1-5-breadcrumb.css',
    paths.webroot + 'css/v3/common/1-6-autocomplete.css',
    paths.webroot + 'css/v3/common/1-7-datepicker.css',
    paths.webroot + 'css/v3/common/1-8-carousel.css',
    paths.webroot + 'css/v3/common/1-9-dialog.css',
    paths.webroot + 'css/v3/common/2-1-dropdown.css',
    paths.webroot + 'css/v3/common/2-2-gallery.css',
    paths.webroot + 'css/v3/common/2-4-process.css',
    paths.webroot + 'css/v3/common/2-5-tabs.css',
    paths.webroot + 'css/v3/common/2-6-tooltip.css',
    paths.webroot + 'css/v3/common/2-7-common.css',
    paths.webroot + 'css/v3/common/2-8-banners.css',
    paths.webroot + 'css/v3/common/3-1-input.css',
    paths.webroot + 'css/v3/common/3-2-rating.css',
    paths.webroot + 'css/v3/common/3-5-otp.css',
    paths.webroot + 'css/v3/common/mobile/*.css',
    paths.webroot + 'css/v3/profile/*.css',
    paths.webroot + 'css/v3/profile/mobile/*.css'
].sort();

paths.concatProfileCommonMobileCssFileName = "auto-gen-mobile-profilecommon-" + paths.randomString + ".min.css";
paths.concatProfileCommonMobileCSSDest = paths.assets + paths.concatProfileCommonMobileCssFileName;
paths.concatProfileCommonMobileCSSDest2 = "./wwwroot/css/dev/profilecommon-mobile.css";

paths.profileCommonPwaCSS = [
    paths.webroot + 'css/v2/listing/mobile/spl/*.css',
    paths.webroot + 'css/v3/common/1-1-fonts.css',
    paths.webroot + 'css/v3/common/1-2-base.css',
    paths.webroot + 'css/v3/common/1-3-header.css',
    paths.webroot + 'css/v3/common/1-4-footer.css',
    paths.webroot + 'css/v3/common/1-5-breadcrumb.css',
    paths.webroot + 'css/v3/common/1-6-autocomplete.css',
    paths.webroot + 'css/v3/common/1-7-datepicker.css',
    paths.webroot + 'css/v3/common/1-8-carousel.css',
    paths.webroot + 'css/v3/common/1-9-dialog.css',
    paths.webroot + 'css/v3/common/2-1-dropdown.css',
    paths.webroot + 'css/v3/common/2-2-gallery.css',
    paths.webroot + 'css/v3/common/2-4-process.css',
    paths.webroot + 'css/v3/common/2-5-tabs.css',
    paths.webroot + 'css/v3/common/2-6-tooltip.css',
    paths.webroot + 'css/v3/common/2-7-common.css',
    paths.webroot + 'css/v3/common/2-8-banners.css',
    paths.webroot + 'css/v3/common/3-1-input.css',
    paths.webroot + 'css/v3/common/3-2-rating.css',
    paths.webroot + 'css/v3/common/3-5-otp.css',
    paths.webroot + 'css/v3/common/mobile/*.css',
    paths.webroot + 'css/v3/profile/*.css',
    paths.webroot + 'css/v3/profile/mobile/*.css'
].sort();

paths.concatProfileCommonPwaCssFileName = "auto-gen-pwa-profilecommon-" + paths.randomString + ".min.css";
paths.concatProfileCommonPwaCSSDest = paths.assets + paths.concatProfileCommonPwaCssFileName;
paths.concatProfileCommonPwaCSSDest2 = "./wwwroot/css/dev/profilecommon-pwa.css";
/*Property Common css*/

//AdListing PWA
paths.concatAdListingPWACssFileName = "auto-gen-pwaad-adlisting-" + paths.randomString + ".min.css";
paths.adlistingPWACss = [paths.webroot + "css/v2/listing/mobile/spl/*.css", paths.webroot + "css/v2/listing/*.css", paths.webroot + "css/v2/listing/mobile/*.css", paths.webroot + "css/web/adlistings/*.css"];
paths.concatadListingPWACssDest = paths.assets + paths.concatAdListingPWACssFileName;
paths.concatadListingPWACssDest2 = "./wwwroot/css/dev/pwaad-adlisting.css";

//Listing PWA
paths.concatListingPWACssFileName = "auto-gen-pwa-listing-" + paths.randomString + ".min.css";
paths.listingPWACss = [paths.webroot + "css/v2/listing/mobile/spl/*.css", paths.webroot + "css/v2/listing/*.css", paths.webroot + "css/v2/listing/mobile/*.css"];
paths.listingPWACostingCss = [paths.webroot + "css/v2/listing/mobile/spl/*.css", paths.webroot + "css/v2/listing/*.css", paths.webroot + "css/v2/listing/mobile/*.css"];
paths.concatListingPWACssDest = paths.assets + paths.concatListingPWACssFileName;
paths.concatListingPWACssDest2 = "./wwwroot/css/dev/pwa-listing.css";

//Profile PWA
paths.concatProfilePWACssFileName = "auto-gen-pwa-profile-" + paths.randomString + ".min.css";
paths.ProfilePWACss = [paths.webroot + "css/mobile/profile/spl/*.css", paths.webroot + "css/mobile/common/*.css", paths.webroot + "css/mobile/profile/*.css"];
paths.concatProfilePWACssDest = paths.assets + paths.concatProfilePWACssFileName;
paths.concatProfilePWACssDest2 = "./wwwroot/css/dev/pwa-profile.css";

// Get Quotes PWA
paths.concatGetquotesPWACssFileName = "auto-gen-pwa-getquotes-" + paths.randomString + ".min.css";
paths.GetquotesPWACss = [
    paths.webroot + 'css/mobile/getquotes/spl/inline.css',
    paths.webroot + 'css/mobile/getquotes/spl/pwa.css',
    paths.webroot + 'css/v2/listing/mobile/2-6-common-spanel.css'
];
paths.concatGetquotesPWACssDest = paths.assets + paths.concatGetquotesPWACssFileName;
paths.concatGetquotesPWACssDest2 = "./wwwroot/css/dev/pwa-getquotes.css";

paths.lcfV2WebCss = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/web/2-3-common-sdialog.css',
    paths.webroot + 'css/v2/listing/web/2-5-scarousel.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css'
];
paths.lcfV2MobileCss = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/mobile/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/web/2-3-common-sdialog.css',
    paths.webroot + 'css/v2/listing/web/2-5-scarousel.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/1-4-input-field.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css',
    paths.webroot + 'css/v2/listing/mobile/3-8-mediaquery.css'
];
paths.concatListingLcfV2WebCssDest = paths.assets + paths.concatListingLcfV2WebCssFileName;
paths.concatListingLcfV2WebCssDest2 = "./wwwroot/css/dev/lcfv2-web.css";

paths.concatListingLcfV2MobileCssDest = paths.assets + paths.concatListingLcfV2MobileCssFileName;
paths.concatListingLcfV2MobileCssDest2 = "./wwwroot/css/dev/lcfv2-mobile.css";

/* Bundling for Ad Post */
// AdPost JS Bundling - Web
paths.concatAdPostWebJsFileName = "auto-gen-adpost-web-" + paths.randomString + ".min.js";
paths.AdPostWebJs = [
    paths.webroot + 'js/v2/common/01-base.js',
    paths.webroot + 'js/v2/common/10-smultiselect-v2.js',
    paths.webroot + 'js/v2/common/15-LcCommon.js',
    paths.webroot + 'js/v2/common/bootstrap-datepicker.js',
    paths.webroot + 'js/v2/common/17-gap-analysis-yp.js',
    paths.webroot + 'js/v2/adpost/googlemap.js',
    paths.webroot + 'js/v2/common/lcf.js',
    paths.webroot + 'js/v2/adpost/imageupload.js',
    paths.webroot + 'js/v2/adpost/payment.js',
    paths.webroot + 'js/v2/adpost/24-adposting.js'
];
paths.concatAdPostWebJsDest = paths.assets + paths.concatAdPostWebJsFileName;
paths.concatAdPostWebJsDest2 = "./wwwroot/js/dev/adpost-web.js";

// AdPost JS Bundling - Mobile
paths.concatAdPostMobileJsFileName = "auto-gen-adpost-mobile-" + paths.randomString + ".min.js";
paths.AdPostMobileJs = [
    paths.webroot + 'js/v2/common/01-base.js',
    paths.webroot + 'js/v2/common/10-smultiselect-v2.js',
    paths.webroot + 'js/v2/common/15-LcCommon.js',
    paths.webroot + 'js/v2/common/bootstrap-datepicker.js',
    paths.webroot + 'js/v2/common/17-gap-analysis-yp.js',
    paths.webroot + 'js/v2/adpost/googlemap.js',
    paths.webroot + 'js/v2/common/lcf.js',
    paths.webroot + 'js/v2/adpost/imageupload.js',
    paths.webroot + 'js/v2/adpost/payment.js',
    paths.webroot + 'js/v2/adpost/24-adposting.js'
];
paths.concatAdPostMobileJsDest = paths.assets + paths.concatAdPostMobileJsFileName;
paths.concatAdPostMobileJsDest2 = "./wwwroot/js/dev/adpost-mobile.js";

// AdPost CSS Bundling - Web
paths.concatAdPostWebCssFileName = "auto-gen-adpost-web-" + paths.randomString + ".min.css";
paths.AdPostWebCss = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-default.css',
    paths.webroot + 'css/v2/listing/web/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/web/2-3-common-sdialog.css',
    paths.webroot + 'css/v2/listing/2-4-common-sgallery.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/web/2-5-scarousel.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css',
    paths.webroot + 'css/v2/adpost/adpost.css',
    paths.webroot + 'css/v2/adpost/circle-progress.css'
];
paths.concatAdPostWebCssDest = paths.assets + paths.concatAdPostWebCssFileName;
paths.concatAdPostWebCssDest2 = "./wwwroot/css/dev/adpost-web.css";

// AdPost CSS Bundling - Mobile
paths.concatAdPostMobileCssFileName = "auto-gen-adpost-mobile-" + paths.randomString + ".min.css";
paths.AdPostMobileCss = [
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/mobile/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/web/2-3-common-sdialog.css',
    paths.webroot + 'css/v2/listing/2-4-common-sgallery.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/web/2-5-scarousel.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css',
    paths.webroot + 'css/v2/adpost/adpost.css',
    paths.webroot + 'css/v2/adpost/circle-progress.css',
    paths.webroot + 'css/v2/listing/mobile/3-8-mediaquery.css'
];
paths.concatAdPostMobileCssDest = paths.assets + paths.concatAdPostMobileCssFileName;
paths.concatAdPostMobileCssDest2 = "./wwwroot/css/dev/adpost-mobile.css";

// AdPost CSS Bundling - PWA
paths.concatAdPostPWACssFileName = "auto-gen-adpost-pwa-" + paths.randomString + ".min.css";
paths.AdPostPWACss = [
    paths.webroot + 'css/v2/listing/mobile/spl/pwa.css',
    paths.webroot + 'css/v2/adpost/mobile/spl/inline.css',
    paths.webroot + 'css/v2/listing/1-1-fonts.css',
    paths.webroot + 'css/v2/listing/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/mobile/1-1-reset-footer.css',
    paths.webroot + 'css/v2/listing/web/2-3-common-sdialog.css',
    paths.webroot + 'css/v2/listing/2-4-common-sgallery.css',
    paths.webroot + 'css/v2/listing/1-2-autocomplete.css',
    paths.webroot + 'css/v2/listing/1-3-sdropdown.css',
    paths.webroot + 'css/v2/listing/2-2-common-sprocess.css',
    paths.webroot + 'css/v2/listing/2-1-common-stabs.css',
    paths.webroot + 'css/v2/listing/web/2-5-scarousel.css',
    paths.webroot + 'css/v2/listing/3-2-bootstrap-datepicker.css',
    paths.webroot + 'css/v2/listing/3-3-component.css',
    paths.webroot + 'css/v2/listing/3-4-lcf.css',
    paths.webroot + 'css/v2/adpost/adpost.css',
    paths.webroot + 'css/v2/adpost/circle-progress.css',
    paths.webroot + 'css/v2/listing/mobile/3-8-mediaquery.css'
];
paths.concatAdPostPWACssDest = paths.assets + paths.concatAdPostPWACssFileName;
paths.concatAdPostPWACssDest2 = "./wwwroot/css/dev/adpost-pwa.css";

/* Bundling for Ad Post */
gulp.task("clean:assets", function (cb) {
    rimraf(paths.assets, cb);
});


//listing
gulp.task("min:listing-web:js", function () {
    return gulp.src([paths.commonWebJs, paths.listingWebJs])
        .pipe(concat(paths.concatListingWebJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:listing-web:js:dev", function () {
    return gulp.src([paths.commonWebJs, paths.listingWebJs])
        .pipe(concat(paths.concatListingWebJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

//listingv2
gulp.task("min:listingv2-web:js", function () {
    return gulp.src([paths.commonWebV2Js, paths.listingWebV2Js])
        .pipe(concat(paths.concatListingWebV2JsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:listingv2-web:js:dev", function () {
    return gulp.src([paths.commonWebV2Js, paths.listingWebV2Js])
        .pipe(concat(paths.concatListingWebV2JsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:listingv2-mobile:js", function () {
    return gulp.src([paths.commonMobileV2Js, paths.listingMobileV2Js])
        .pipe(concat(paths.concatListingMobileV2JsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:listingv2-mobile:js:dev", function () {
    return gulp.src([paths.commonMobileV2Js, paths.listingMobileV2Js])
        .pipe(concat(paths.concatListingMobileV2JsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:lcfv2web:js", function () {
    return gulp.src(paths.lcfV2Js, { base: "./" })
        .pipe(concat(paths.concatListingLcfV2WebJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:lcfv2web:js:dev", function () {
    return gulp.src(paths.lcfV2Js, { base: "./" })
        .pipe(concat(paths.concatListingLcfV2WebJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});


/*AdListing Scripts bundling - WEB*/
gulp.task("min:adlisting-web:js", function () {
    return gulp.src([paths.commonAdListingsWebJS, paths.bsnsListingWebJS, paths.adListingWebJS])
        .pipe(concat(paths.concatAdListingWebJSDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:adlisting-web:js:dev", function () {
    return gulp.src([paths.commonAdListingsWebJS, paths.bsnsListingWebJS, paths.adListingWebJS])
        .pipe(concat(paths.concatListingWebV2JsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
/*AdListing Scripts bundling - WEB*/

/*AdListing Scripts bundling - Mobile*/
gulp.task("min:adlisting-mobile:js", function () {
    return gulp.src([paths.commonAdListingsMobileJS, paths.bsnsListingMobileJS, paths.adListingMobileJS])
        .pipe(concat(paths.concatAdListingMobileJSDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:adlisting-mobile:js:dev", function () {
    return gulp.src([paths.commonAdListingsMobileJS, paths.bsnsListingMobileJS, paths.adListingMobileJS])
        .pipe(concat(paths.concatAdListingMobileJSDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
/*AdListing Scripts bundling - Mobile*/


gulp.task("min:lcfv2-mobile:js", function () {
    return gulp.src(paths.lcfV2MobileJs, { base: "./" })
        .pipe(concat(paths.concatListingLcfV2MobileJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:lcfv2-mobile:js:dev", function () {
    return gulp.src(paths.lcfV2MobileJs, { base: "./" })
        .pipe(concat(paths.concatListingLcfV2MobileJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});


gulp.task("min:costing-mobile:js", function () {
    return gulp.src(paths.costingJs, { base: "./" })
        .pipe(concat(paths.concatListingCostingJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:costing-mobile:js:dev", function () {
    return gulp.src(paths.costingJs, { base: "./" })
        .pipe(concat(paths.concatListingCostingJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("replace:costing:scripts", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-costing-(.*)\.js/g, paths.concatListingCostingJsFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

//hub page
gulp.task("min:hubpage-web:js", function () {
    return gulp.src([paths.commonHubJs, paths.hubPageJs])
        .pipe(concat(paths.concatHubPageWebJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:hubpage-web:js:dev", function () {
    return gulp.src([paths.commonHubJs, paths.hubPageJs])
        .pipe(concat(paths.concatHubPageWebJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:hubpage-web:css", function () {
    return gulp.src([paths.commonHubCss, paths.hubPageCss])
        .pipe(concat(paths.concatHubPageWebCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:hubpage-web:css:dev", function () {
    return gulp.src([paths.commonHubCss, paths.hubPageCss])
        .pipe(concat(paths.concatHubPageWebCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

//portfolio
gulp.task("min:portfoliopage-web:js", function () {
    return gulp.src([paths.commonHubJs, paths.portfolioPageJs])
        .pipe(concat(paths.concatPortfolioPageWebJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:portfoliopage-web:js:dev", function () {
    return gulp.src([paths.commonHubJs, paths.portfolioPageJs])
        .pipe(concat(paths.concatPortfolioPageWebJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:porfoliopage-web:css", function () {
    return gulp.src([paths.hubPageCss, paths.portfolioPageCss, '!./wwwroot/css/web/hub/0_hubpage.css'])
        .pipe(concat(paths.concatPortfolioPageWebCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:portfoliopage-web:css:dev", function () {
    return gulp.src([paths.hubPageCss, paths.portfolioPageCss, '!./wwwroot/css/web/hub/0_hubpage.css'])
        .pipe(concat(paths.concatPortfolioPageWebCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

//article
gulp.task("min:articlepage-web:js", function () {
    return gulp.src([paths.commonHubJs, paths.articlePageJs])
        .pipe(concat(paths.concatArticlePageWebJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:articlepage-web:js:dev", function () {
    return gulp.src([paths.commonHubJs, paths.articlePageJs])
        .pipe(concat(paths.concatArticlePageWebJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

//bloglist
gulp.task("min:bloglistpage-web:js", function () {
    return gulp.src([paths.commonWebJs, paths.bloglistPageJs, '!./wwwroot/js/web/common/20-Lcf-web.js'])
        .pipe(concat(paths.concatBlogListPageWebJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:bloglistpage-web:js:dev", function () {
    return gulp.src([paths.commonWebJs, paths.bloglistPageJs, '!./wwwroot/js/web/common/20-Lcf-web.js'])
        .pipe(concat(paths.concatBlogListPageWebJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});




gulp.task("min:listing-mobile:js", function () {
    return gulp.src([paths.commonMobileJs, paths.listingMobileJs])
        .pipe(concat(paths.concatListingMobileJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:listing-mobile:js:dev", function () {
    return gulp.src([paths.commonMobileJs, paths.listingMobileJs])
        .pipe(concat(paths.concatListingMobileJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:listing-web:css", function () {
    return gulp.src([paths.commonWebCss, paths.listingWebCss])
        .pipe(concat(paths.concatListingWebCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:listing-web:css:dev", function () {
    return gulp.src([paths.commonWebCss, paths.listingWebCss])
        .pipe(concat(paths.concatListingWebCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:listing-mobile:css", function () {
    return gulp.src([paths.commonMobileCss, paths.listingMobileCss])
        .pipe(concat(paths.concatListingMobileCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:listing-mobile:css:dev", function () {
    return gulp.src([paths.commonMobileCss, paths.listingMobileCss])
        .pipe(concat(paths.concatListingMobileCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});


//Ad listing PWA Start

gulp.task("min:adlisting-pwa:css", function () {
    return gulp.src(paths.adlistingPWACss)
        .pipe(concat(paths.concatadListingPWACssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));

});

gulp.task("min:adlisting-pwa:css:dev", function () {
    return gulp.src(paths.adlistingPWACss)
        .pipe(concat(paths.concatadListingPWACssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

//Ad listing PWA End

//listing PWA Start
gulp.task("min:listing-pwa:css", function () {
    return gulp.src(paths.listingPWACss)
        .pipe(concat(paths.concatListingPWACssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:listing-pwa:css:dev", function () {
    return gulp.src(paths.listingPWACss)
        .pipe(concat(paths.concatListingPWACssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

//listing PWA End


//Profile PWA Start
gulp.task("min:profile-pwa:css", function () {
    return gulp.src(paths.ProfilePWACss)
        .pipe(concat(paths.concatProfilePWACssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:profile-pwa:css:dev", function () {
    return gulp.src(paths.ProfilePWACss)
        .pipe(concat(paths.concatProfilePWACssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

//Profile PWA End

//GetQuotes PWA Start
gulp.task("min:getquotes-pwa:css", function () {
    return gulp.src(paths.GetquotesPWACss.concat(paths.lcfV2MobileCss), { base: "./" })
        .pipe(concat(paths.concatGetquotesPWACssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:getquotes-pwa:css:dev", function () {
    return gulp.src(paths.GetquotesPWACss.concat(paths.lcfV2MobileCss), { base: "./" })
        .pipe(concat(paths.concatGetquotesPWACssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

//GetQuotes PWA End


//listingv2

gulp.task("min:listingv2-mobile:css", function () {
    return gulp.src(paths.listingMobileV2Css)
        .pipe(concat(paths.concatListingMobileV2CssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:listingv2-mobile:css:dev", function () {
    return gulp.src(paths.listingMobileV2Css)
        .pipe(concat(paths.concatListingMobileV2CssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});


gulp.task("min:listingv2-web:css", function () {
    return gulp.src(paths.listingWebV2Css)
        .pipe(concat(paths.concatListingWebV2CssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:listingv2-web:css:dev", function () {
    return gulp.src(paths.listingWebV2Css)
        .pipe(concat(paths.concatListingWebV2CssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:adlisting-web:css", function () {
    return gulp.src(paths.adListingWebCSS)
        .pipe(concat(paths.concatAdListingWebCSSDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:adlisting-web:css:dev", function () {
    return gulp.src(paths.adListingWebCSS)
        .pipe(concat(paths.concatAdListingWebCSSDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:adlisting-mobile:css", function () {
    return gulp.src(paths.adListingMobileCSS)
        .pipe(concat(paths.concatAdListingMobileCSSDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:adlisting-mobile:css:dev", function () {
    return gulp.src(paths.adListingMobileCSS)
        .pipe(concat(paths.concatAdListingMobileCSSDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:lcfv2-web:css", function () {
    return gulp.src(paths.lcfV2WebCss, { base: "./" })
        .pipe(concat(paths.concatListingLcfV2WebCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:lcfv2-web:css:dev", function () {
    return gulp.src(paths.lcfV2WebCss, { base: "./" })
        .pipe(concat(paths.concatListingLcfV2WebCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:lcfv2-mobile:css", function () {
    return gulp.src(paths.lcfV2MobileCss, { base: "./" })
        .pipe(concat(paths.concatListingLcfV2MobileCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:lcfv2-mobile:css:dev", function () {
    return gulp.src(paths.lcfV2MobileCss, { base: "./" })
        .pipe(concat(paths.concatListingLcfV2MobileCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

//profile

gulp.task("min:profile-web:js", function () {
    return gulp.src(['!' + paths.webroot + "js/web/common/06-sgallery.js", paths.webroot + "js/web/common/*.js", paths.profileWebJs])
        .pipe(concat(paths.concatProfileWebJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:profile-web:js:dev", function () {
    return gulp.src(['!' + paths.webroot + "js/web/common/06-sgallery.js", paths.webroot + "js/web/common/*.js", paths.profileWebJs])
        .pipe(concat(paths.concatProfileWebJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:profile-mobile:js", function () {
    return gulp.src(['!' + paths.webroot + "js/mobile/common/05-sgallery.js", paths.webroot + "js/mobile/common/*.js", paths.profileMobileJs])
        .pipe(concat(paths.concatProfileMobileJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:profile-mobile:js:dev", function () {
    return gulp.src(['!' + paths.webroot + "js/mobile/common/05-sgallery.js", paths.webroot + "js/mobile/common/*.js", paths.profileMobileJs])
        .pipe(concat(paths.concatProfileMobileJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:profile-web:css", function () {
    return gulp.src(['!' + paths.webroot + "css/web/common/2-4-common-sgallery.css", paths.webroot + "css/web/common/*.css", paths.profileWebCss])
        .pipe(concat(paths.concatProfileWebCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:profile-web:css:dev", function () {
    return gulp.src(['!' + paths.webroot + "css/web/common/2-4-common-sgallery.css", paths.webroot + "css/web/common/*.css", paths.profileWebCss])
        .pipe(concat(paths.concatProfileWebCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:profile-mobile:css", function () {
    return gulp.src(['!' + paths.webroot + "css/mobile/common/2-4-common-sgallery.css", paths.webroot + "css/mobile/common/*.css", paths.profileMobileCss])
        .pipe(concat(paths.concatProfileMobileCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:profile-mobile:css:dev", function () {
    return gulp.src(['!' + paths.webroot + "css/mobile/common/2-4-common-sgallery.css", paths.webroot + "css/mobile/common/*.css", paths.profileMobileCss])
        .pipe(concat(paths.concatProfileMobileCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

//profileV2

gulp.task("min:profilev2-web:js", function () {
    return gulp.src(paths.profileV2WebJs)
        .pipe(concat(paths.concatProfileV2WebJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:profilev2-web:js:dev", function () {
    return gulp.src(paths.profileV2WebJs)
        .pipe(concat(paths.concatProfileV2WebJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:profilev2-mobile:js", function () {
    return gulp.src(paths.profileV2MobileJs)
        .pipe(concat(paths.concatProfileV2MobileJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:profilev2-mobile:js:dev", function () {
    return gulp.src(paths.profileV2MobileJs)
        .pipe(concat(paths.concatProfileV2MobileJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:profilev2-web:css", function () {
    return gulp.src(paths.profileV2WebCss)
        .pipe(concat(paths.concatProfileV2WebCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:profilev2-web:css:dev", function () {
    return gulp.src(paths.profileV2WebCss)
        .pipe(concat(paths.concatProfileV2WebCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:profilev2-mobile:css", function () {
    return gulp.src(paths.profileV2MobileCss)
        .pipe(concat(paths.concatProfileV2MobileCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:profilev2-mobile:css:dev", function () {
    return gulp.src(paths.profileV2MobileCss)
        .pipe(concat(paths.concatProfileV2MobileCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:profilev2-pwa:css", function () {
    return gulp.src(paths.profileV2PwaCss)
        .pipe(concat(paths.concatProfileV2PwaCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:profilev2-pwa:css:dev", function () {
    return gulp.src(paths.profileV2PwaCss)
        .pipe(concat(paths.concatProfileV2PwaCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});


//bloghome 
gulp.task("min:bloghome-web:js", function () {
    return gulp.src(paths.bloghomeWebJs)
        .pipe(concat(paths.concatBlogHomeWebJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:bloghome-web:js:dev", function () {
    return gulp.src(paths.bloghomeWebJs)
        .pipe(concat(paths.concatBlogHomeWebJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

// end


//Static Page 


gulp.task("min:staticpage-web:css", function () {
    return gulp.src(paths.staticWebCss)
        .pipe(concat(paths.concatStaticPageWebDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:staticpage-web:css:dev", function () {
    return gulp.src(paths.staticWebCss)
        .pipe(concat(paths.concatStaticPageWebDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:staticpage-mobile:css", function () {
    return gulp.src(paths.staticMobileCss)
        .pipe(concat(paths.concatStaticPageMobileDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:staticpage-mobile:css:dev", function () {
    return gulp.src(paths.staticMobileCss)
        .pipe(concat(paths.concatStaticPageMobileDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:staticpage-pwa:css", function () {
    return gulp.src(paths.staticPWACss)
        .pipe(concat(paths.concatStaticPagePWADest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:staticpage-pwa:css:dev", function () {
    return gulp.src(paths.staticPWACss)
        .pipe(concat(paths.concatStaticPagePWADest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
//End

/* For AdPost Task Created */
// AdPost JS Task - Web
gulp.task("min:adpost-web:js", function () {
    return gulp.src(paths.AdPostWebJs, { base: "./" })
        .pipe(concat(paths.concatAdPostWebJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:adpost-web:js:dev", function () {
    return gulp.src(paths.AdPostWebJs, { base: "./" })
        .pipe(concat(paths.concatAdPostWebJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
// AdPost JS Task - Mobile
gulp.task("min:adpost-mobile:js", function () {
    return gulp.src(paths.AdPostMobileJs, { base: "./" })
        .pipe(concat(paths.concatAdPostMobileJsDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:adpost-mobile:js:dev", function () {
    return gulp.src(paths.AdPostMobileJs, { base: "./" })
        .pipe(concat(paths.concatAdPostMobileJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
// AdPost CSS Task - Web
gulp.task("min:adpost-web:css", function () {
    return gulp.src(paths.AdPostWebCss)
        .pipe(concat(paths.concatAdPostWebCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:adpost-web:css:dev", function () {
    return gulp.src(paths.AdPostWebCss)
        .pipe(concat(paths.concatAdPostWebCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
// AdPost CSS Task - Mobile
gulp.task("min:adpost-mobile:css", function () {
    return gulp.src(paths.AdPostMobileCss)
        .pipe(concat(paths.concatAdPostMobileCssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:adpost-mobile:css:dev", function () {
    return gulp.src(paths.AdPostMobileCss)
        .pipe(concat(paths.concatAdPostMobileCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
// AdPost CSS Task - PWA
gulp.task("min:adpost-pwa:css", function () {
    return gulp.src(paths.AdPostPWACss)
        .pipe(concat(paths.concatAdPostPWACssDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:adpost-pwa:css:dev", function () {
    return gulp.src(paths.AdPostPWACss)
        .pipe(concat(paths.concatAdPostPWACssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
/* For AdPost Task Created */

gulp.task("replace:web:listing:scripts", function () {
    return gulp.src("./Views/Shared/_Scripts.cshtml")
        .pipe(replace(/auto-gen-web-(.*)\.js/g, paths.concatListingWebJsFileName))
        .pipe(gulp.dest('./Views/Shared/'));
});

gulp.task("replace:search:enpoint:url", function () {
    return gulp.src([paths.webroot + "js/web/common/01-base.js", paths.webroot + "js/mobile/common/01-base.js", paths.webroot + "js/web/common/20-Lcf-web.js"])
        .pipe(replace(/azsearchdev.sulekha.com/g, 'azsearch.sulekha.com'))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

gulp.task("replace:web:listing:scripts:dev", function () {
    return gulp.src("./Views/Shared/_Scripts.cshtml")
        .pipe(replace(/auto-version-(.*)-dev/g, paths.concatListingWebJsFileName))
        .pipe(gulp.dest('./Views/Shared/'));
});

gulp.task("replace:mobile:listing:scripts", function () {
    return gulp.src("./Views/Shared/Mobile/_Scripts.cshtml")
        .pipe(replace(/auto-gen-mobile-(.*)\.js/g, paths.concatListingMobileJsFileName))
        .pipe(gulp.dest('./Views/Shared/Mobile/'));
});

gulp.task("replace:mobile:listing:scripts:dev", function () {
    return gulp.src("./Views/Shared/Mobile/_Scripts.cshtml")
        .pipe(replace(/auto-version-(.*)-dev/g, paths.concatListingMobileJsFileName))
        .pipe(gulp.dest('./Views/Shared/Mobile/'));
});

gulp.task("replace:web:listing:css", function () {
    return gulp.src("./Views/Shared/_Css.cshtml")
        .pipe(replace(/auto-gen-web-(.*)\.css/g, paths.concatListingWebCssFileName))
        .pipe(gulp.dest('./Views/Shared/'));
});

gulp.task("replace:web:listing:css:dev", function () {
    return gulp.src("./Views/Shared/_Css.cshtml")
        .pipe(replace(/auto-version-(.*)-dev/g, paths.concatListingWebCssFileName))
        .pipe(gulp.dest('./Views/Shared/'));
});

gulp.task("replace:mobile:listing:css", function () {
    return gulp.src("./Views/Shared/Mobile/_Css.cshtml")
        .pipe(replace(/auto-gen-mobile-(.*)\.css/g, paths.concatListingMobileCssFileName))
        .pipe(gulp.dest('./Views/Shared/Mobile/'));
});

gulp.task("replace:mobile:listing:css:dev", function () {
    return gulp.src("./Views/Shared/Mobile/_Css.cshtml")
        .pipe(replace(/auto-version-(.*)-dev/g, paths.concatListingMobileCssFileName))
        .pipe(gulp.dest('./Views/Shared/Mobile/'));
});


//listingv2

gulp.task("replace:web:listingv2:scripts", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-web-listingv2-(.*)\.js/g, paths.concatListingWebV2JsFileName))
        .pipe(replace(/auto-gen-costing-(.*)\.js/g, paths.concatListingCostingJsFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:web:adlisting:scripts", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-web-adlistings-(.*)\.js/g, paths.concatAdListingWebJSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});
gulp.task("replace:mobile:adlisting:scripts", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-mobile-adlistings-(.*)\.js/g, paths.concatAdListingMobileJSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:search:enpoint:urlv2", function () {
    return gulp.src([paths.webroot + "js/v2/common/01-base.js", paths.webroot + "js/v2/common/20-Lcf-web.js"])
        .pipe(replace(/azsearchdev.sulekha.com/g, 'azsearch.sulekha.com'))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

gulp.task("replace:web:listingv2:scripts:dev", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-version-(.*)-dev/g, paths.concatListingWebV2JsFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:web:adlisting:scripts:dev", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-web-adlistings-(.*)-dev/g, paths.concatAdListingWebJSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:mobile:adlisting:scripts:dev", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-mobile-adlistings-(.*)-dev/g, paths.concatAdListingMobileJSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});


gulp.task("replace:web:listingv2:css", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-web-listingv2-(.*)\.css/g, paths.concatListingWebV2CssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:web:listingv2:css:dev", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-version-(.*)-dev/g, paths.concatListingWebV2CssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:web:adlisting:css", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-web-adlistings-(.*)\.css/g, paths.concatAdListingWebCssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:web:adlisting:css:dev", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-web-adlistings-(.*)-dev/g, paths.concatAdListingWebCssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:mobile:adlisting:css", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-mobile-adlistings-(.*)\.css/g, paths.concatAdListingMobileCssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:mobile:adlisting:css:dev", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-mobile-adlistings-(.*)-dev/g, paths.concatAdListingMobileCssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});



gulp.task("replace:mobile:listingv2:scripts", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-mobile-listingv2-(.*)\.js/g, paths.concatListingMobileV2JsFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:mobile:listingv2:scripts:dev", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-version-(.*)-dev/g, paths.concatListingMobileV2JsFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});


gulp.task("replace:mobile:listingv2:css", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-mobile-listingv2-(.*)\.css/g, paths.concatListingMobileV2CssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:mobile:listingv2:css:dev", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-version-(.*)-dev/g, paths.concatListingMobileV2CssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

// AdListing PWA 
gulp.task("replace:mobile:adlisting-pwa:css", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-pwaad-(.*)\.css/g, paths.concatAdListingPWACssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

// Listing PWA 
gulp.task("replace:mobile:listing-pwa:css", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-pwa-(.*)\.css/g, paths.concatListingPWACssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});
// Profile PWA
gulp.task("replace:mobile:profile-pwa:css", function () {
    return gulp.src("./Views/Profile/Mobile/_ProfileCss.cshtml")
        .pipe(replace(/auto-gen-pwa-(.*)\.css/g, paths.concatProfilePWACssFileName))
        .pipe(gulp.dest('./Views/Profile/Mobile/'));
});

// GetQuotes PWA
gulp.task("replace:mobile:getquotes-pwa:css", function () {
    return gulp.src("./Views/Shared/V2/_LcfCss.cshtml")
        .pipe(replace(/auto-gen-pwa-(.*)\.css/g, paths.concatGetquotesPWACssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

//hub
gulp.task("replace:web:hubpage:scripts", function () {
    return gulp.src("./Views/Hub/_HubScripts.cshtml")
        .pipe(replace(/auto-gen-(.*)\.js/g, paths.concatHubPageJsFileName))
        .pipe(gulp.dest('./Views/Hub/'));
});
gulp.task("replace:web:hubpage:scripts:dev", function () {
    return gulp.src("./Views/Hub/_HubScripts.cshtml")
        .pipe(replace(/auto-gen-(.*)-dev/g, paths.concatHubPageJsFileName))
        .pipe(gulp.dest('./Views/Hub/'));
});

gulp.task("replace:web:portfoliopage:scripts", function () {
    return gulp.src("./Views/Hub/_PortfolioScripts.cshtml")
        .pipe(replace(/auto-gen-(.*)\.js/g, paths.concatPortfolioPageJsFileName))
        .pipe(gulp.dest('./Views/Hub/'));
});
gulp.task("replace:web:portfoliopage:scripts:dev", function () {
    return gulp.src("./Views/Hub/_PortfolioScripts.cshtml")
        .pipe(replace(/auto-gen-(.*)-dev/g, paths.concatPortfolioPageJsFileName))
        .pipe(gulp.dest('./Views/Hub/'));
});

gulp.task("replace:web:articlepage:scripts", function () {
    return gulp.src("./Views/Blogs/_ArticleScripts.cshtml")
        .pipe(replace(/auto-gen-(.*)\.js/g, paths.concatArticlePageJsFileName))
        .pipe(gulp.dest('./Views/Blogs/'));
});
gulp.task("replace:web:articlepage:scripts:dev", function () {
    return gulp.src("./Views/Blogs/_ArticleScripts.cshtml")
        .pipe(replace(/auto-gen-(.*)-dev/g, paths.concatArticlePageJsFileName))
        .pipe(gulp.dest('./Views/Blogs/'));
});

gulp.task("replace:web:bloglistpage:scripts", function () {
    return gulp.src("./Views/Blogs/_BlogListScripts.cshtml")
        .pipe(replace(/auto-gen-(.*)\.js/g, paths.concatBlogListPageJsFileName))
        .pipe(gulp.dest('./Views/Blogs/'));
});
gulp.task("replace:web:bloglistpage:scripts:dev", function () {
    return gulp.src("./Views/Blogs/_BlogListScripts.cshtml")
        .pipe(replace(/auto-gen-(.*)-dev/g, paths.concatBlogListPageJsFileName))
        .pipe(gulp.dest('./Views/Blogs/'));
});



gulp.task("replace:web:hubpage:css", function () {
    return gulp.src("./Views/Hub/_HubCss.cshtml")
        .pipe(replace(/auto-gen-(.*)\.css/g, paths.concatHubPageCsssFileName))
        .pipe(gulp.dest('./Views/Hub/'));
});

gulp.task("replace:web:hubpage:css:dev", function () {
    return gulp.src("./Views/Hub/_HubCss.cshtml")
        .pipe(replace(/auto-gen-(.*)-dev/g, paths.concatHubPageCsssFileName))
        .pipe(gulp.dest('./Views/Hub/'));
});

gulp.task("replace:web:portfoliopage:css", function () {
    return gulp.src("./Views/Hub/_PortfolioCss.cshtml")
        .pipe(replace(/auto-gen-(.*)\.css/g, paths.concatPortfolioPageCssFileName))
        .pipe(gulp.dest('./Views/Hub/'));
});

gulp.task("replace:web:portfoliopage:css:dev", function () {
    return gulp.src("./Views/Hub/_PortfolioCss.cshtml")
        .pipe(replace(/auto-gen-(.*)-dev/g, paths.concatPortfolioPageCssFileName))
        .pipe(gulp.dest('./Views/Hub/'));
});

//profile
gulp.task("replace:web:profile:scripts", function () {
    return gulp.src("./Views/Profile/_ProfileScripts.cshtml")
        .pipe(replace(/auto-gen-web-(.*)\.js/g, paths.concatProfileWebJsFileName))
        .pipe(gulp.dest('./Views/Profile/'));
});
gulp.task("replace:web:profile:scripts:dev", function () {
    return gulp.src("./Views/Profile/_ProfileScripts.cshtml")
        .pipe(replace(/auto-version-(.*)-dev/g, paths.concatProfileWebJsFileName))
        .pipe(gulp.dest('./Views/Profile/'));
});

gulp.task("replace:mobile:profile:scripts", function () {
    return gulp.src("./Views/Profile/Mobile/_ProfileScripts.cshtml")
        .pipe(replace(/auto-gen-mobile-(.*)\.js/g, paths.concatProfileMobileJsFileName))
        .pipe(gulp.dest('./Views/Profile/Mobile/'));
});

gulp.task("replace:mobile:profile:scripts:dev", function () {
    return gulp.src("./Views/Profile/Mobile/_ProfileScripts.cshtml")
        .pipe(replace(/auto-version-(.*)-dev/g, paths.concatProfileMobileJsFileName))
        .pipe(gulp.dest('./Views/Profile/Mobile/'));
});

gulp.task("replace:web:profile:css", function () {
    return gulp.src("./Views/Profile/_ProfileCss.cshtml")
        .pipe(replace(/auto-gen-web-(.*)\.css/g, paths.concatProfileWebCssFileName))
        .pipe(gulp.dest('./Views/Profile/'));
});

gulp.task("replace:web:profile:css:dev", function () {
    return gulp.src("./Views/Profile/_ProfileCss.cshtml")
        .pipe(replace(/auto-version-(.*)-dev/g, paths.concatProfileWebCssFileName))
        .pipe(gulp.dest('./Views/Profile/'));
});

gulp.task("replace:mobile:profile:css", function () {
    return gulp.src("./Views/Profile/Mobile/_ProfileCss.cshtml")
        .pipe(replace(/auto-gen-mobile-(.*)\.css/g, paths.concatProfileMobileCssFileName))
        .pipe(gulp.dest('./Views/Profile/Mobile/'));
});

gulp.task("replace:mobile:profile:css:dev", function () {
    return gulp.src("./Views/Profile/Mobile/_ProfileCss.cshtml")
        .pipe(replace(/auto-version-(.*)-dev/g, paths.concatProfileMobileCssFileName))
        .pipe(gulp.dest('./Views/Profile/Mobile/'));
});


//profile V2
gulp.task("replace:web:profilev2:scripts", function () {
    return gulp.src("./Views/Profile/V2/_ProfileV2Scripts.cshtml")
        .pipe(replace(/auto-gen-web-(.*)\.js/g, paths.concatProfileV2WebJsFileName))
        .pipe(gulp.dest('./Views/Profile/V2/'));
});
gulp.task("replace:web:profilev2:scripts:dev", function () {
    return gulp.src("./Views/Profile/V2/_ProfileV2Scripts.cshtml")
        .pipe(replace(/auto-gen-web-(.*)-dev/g, paths.concatProfileV2WebJsFileName))
        .pipe(gulp.dest('./Views/Profile/V2/'));
});
gulp.task("replace:mobile:profilev2:scripts", function () {
    return gulp.src("./Views/Profile/V2/_ProfileV2Scripts.cshtml")
        .pipe(replace(/auto-gen-mobile-(.*)\.js/g, paths.concatProfileV2MobileJsFileName))
        .pipe(gulp.dest('./Views/Profile/V2/'));
});
gulp.task("replace:mobile:profilev2:scripts:dev", function () {
    return gulp.src("./Views/Profile/V2/_ProfileV2Scripts.cshtml")
        .pipe(replace(/auto-gen-mobile-(.*)-dev/g, paths.concatProfileV2MobileJsFileName))
        .pipe(gulp.dest('./Views/Profile/V2/'));
});


gulp.task("replace:web:profilev2:css", function () {
    return gulp.src("./Views/Profile/V2/_ProfileV2Styles.cshtml")
        .pipe(replace(/auto-gen-web-profilev2-(.*)\.css/g, paths.concatProfileV2WebCssFileName))
        .pipe(gulp.dest('./Views/Profile/V2/'));
});

gulp.task("replace:web:profilev2:css:dev", function () {
    return gulp.src("./Views/Profile/V2/_ProfileV2Styles.cshtml")
        .pipe(replace(/auto-version-web-profilev2-(.*)-dev/g, paths.concatProfileV2WebCssFileName))
        .pipe(gulp.dest('./Views/Profile/V2/'));
});

gulp.task("replace:mobile:profilev2:css", function () {
    return gulp.src("./Views/Profile/V2/_ProfileV2Styles.cshtml")
        .pipe(replace(/auto-gen-mobile-profilev2-(.*)\.css/g, paths.concatProfileV2MobileCssFileName))
        .pipe(gulp.dest('./Views/Profile/V2/'));
});

gulp.task("replace:mobile:profilev2:css:dev", function () {
    return gulp.src("./Views/Profile/V2/_ProfileV2Styles.cshtml")
        .pipe(replace(/auto-version-mobile-profilev2-(.*)-dev/g, paths.concatProfileV2MobileCssFileName))
        .pipe(gulp.dest('./Views/Profile/V2/'));
});
gulp.task("replace:pwa:profilev2:css", function () {
    return gulp.src("./Views/Profile/V2/_ProfileV2Styles.cshtml")
        .pipe(replace(/auto-gen-pwa-profilev2-(.*)\.css/g, paths.concatProfileV2PwaCssFileName))
        .pipe(gulp.dest('./Views/Profile/V2/'));
});

gulp.task("replace:pwa:profilev2:css:dev", function () {
    return gulp.src("./Views/Profile/V2/_ProfileV2Styles.cshtml")
        .pipe(replace(/auto-version-pwa-profilev2-(.*)-dev/g, paths.concatProfileV2PwaCssFileName))
        .pipe(gulp.dest('./Views/Profile/V2/'));
});

//blog start
gulp.task("replace:web:bloghome:scripts", function () {
    return gulp.src("./Views/BlogHomePage/_BlogHomePageScripts.cshtml")
        .pipe(replace(/auto-gen-web-(.*)\.js/g, paths.concatBlogHomeWebJsFileName))
        .pipe(gulp.dest('./Views/BlogHomePage/'));
});
gulp.task("replace:web:bloghome:scripts:dev", function () {
    return gulp.src("./Views/BlogHomePage/_BlogHomePageScripts.cshtml")
        .pipe(replace(/auto-gen-web-(.*)-dev/g, paths.concatBlogHomeWebJsFileName))
        .pipe(gulp.dest('./Views/BlogHomePage/'));
});
// Static Page 


gulp.task("replace:staticpage:css", function () {
    return gulp.src("./Views/Shared/V2/_StaticCss.cshtml")
        .pipe(replace(/auto-gen-web-staticpage-(.*)\.css/g, paths.concatStaticWebCSSFileName))
        .pipe(replace(/auto-gen-mobile-staticpage-(.*)\.css/g, paths.concatStaticMobileCSSFileName))
        .pipe(replace(/auto-gen-pwa-staticpage-(.*)\.css/g, paths.concatStaticPWACSSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

// End


gulp.task("replace:lcf:css:js", function () {
    return gulp.src(["./Views/Shared/V2/_LcfCss.cshtml", "./Views/Shared/V2/_LcfScripts.cshtml"], { base: "./" })
        .pipe(replace(/auto-gen-lcfv2-web-(.*)\.css/g, paths.concatListingLcfV2WebCssFileName))
        .pipe(replace(/auto-gen-lcfv2-mobile-(.*)\.css/g, paths.concatListingLcfV2MobileCssFileName))
        .pipe(replace(/auto-gen-lcfv2-mobile-(.*)\.js/g, paths.concatListingLcfV2MobileJsFileName))
        .pipe(replace(/auto-gen-lcfv2-web-(.*)\.js/g, paths.concatListingLcfV2WebJsFileName))
        .pipe(gulp.dest('.'));
});

gulp.task("replace:adpost:scripts", function () {
    return gulp.src("./Views/Shared/Components/AdPost/_AdPostScripts.cshtml")
        .pipe(replace(/auto-gen-adpost-web-(.*)\.js/g, paths.concatAdPostWebJsFileName))
        .pipe(replace(/auto-gen-adpost-mobile-(.*)\.js/g, paths.concatAdPostMobileJsFileName))
        .pipe(gulp.dest('./Views/Shared/Components/AdPost/'));
});

gulp.task("replace:adpost:css", function () {
    return gulp.src("./Views/Shared/Components/AdPost/_AdPostCss.cshtml")
        .pipe(replace(/auto-gen-adpost-web-(.*)\.css/g, paths.concatAdPostWebCssFileName))
        .pipe(replace(/auto-gen-adpost-mobile-(.*)\.css/g, paths.concatAdPostMobileCssFileName))
        .pipe(replace(/auto-gen-adpost-pwa-(.*)\.css/g, paths.concatAdPostPWACssFileName))
        .pipe(gulp.dest('./Views/Shared/Components/AdPost/'));
});

//end profile
gulp.task("append:build-time", function () {
    return gulp.src(["./Views/Shared/_Layout.cshtml", "./Views/Shared/V2/_Layout.cshtml", "./Views/Listing/V2/_Standalone.cshtml", "./Views/Listing/V2/_GetQuotes.cshtml"], { base: "./" })
        .pipe(replace(/html data-build-time=\"(.*)\"/g, "html data-build-time=\"" + dateFormat(now) + "\""))
        .pipe(gulp.dest("."));
});

/**** AdListings Scripts Bundling and Minification Web****/

paths.commonAdListingsWebJS = paths.webroot + "js/v2/common/*.js";
paths.bsnsListingWebJS = paths.webroot + "js/v2/listing/web/*.js";

paths.adListingWebJS = paths.webroot + "js/web/adlistings/*.js";

paths.concatAdListingWebJSFileName = "auto-gen-web-adlistings-" + paths.randomString + ".min.js";
paths.concatAdListingWebJSDest = paths.assets + paths.concatAdListingWebJSFileName;
paths.concatAdListingWebJSDest2 = "./wwwroot/js/dev/adlisting-web.js";

/**** AdListings Scripts Bundling and Minification Web****/


/**** AdListings Scripts Bundling and Minification Mobile****/

paths.commonAdListingsMobileJS = paths.webroot + "js/v2/common/*.js";
paths.bsnsListingMobileJS = paths.webroot + "js/v2/listing/mobile/*.js";
paths.adListingMobileJS = paths.webroot + "js/web/adlistings/*.js";

paths.concatAdListingMobileJSFileName = "auto-gen-mobile-adlistings-" + paths.randomString + ".min.js";
paths.concatAdListingMobileJSDest = paths.assets + paths.concatAdListingMobileJSFileName;
paths.concatAdListingMobileJSDest2 = "./wwwroot/js/dev/adlisting-mobile.js";

/**** AdListings Scripts Bundling and Minification Mobile ****/


/*** Ad Listings WEB*****/
paths.adListingWebCSS = [paths.webroot + "css/v2/listing/*.css", paths.webroot + "css/v2/listing/web/*.css", paths.webroot + "css/web/adlistings/*.css", paths.webroot + "css/v3/common/3-3-listings-card.css"].sort();
paths.concatAdListingWebCssFileName = "auto-gen-web-adlistings-" + paths.randomString + ".min.css";
paths.concatAdListingWebCSSDest = paths.assets + paths.concatAdListingWebCssFileName;
paths.concatAdListingWebCSSDest2 = "./wwwroot/css/dev/adlistings-web.css";

/*** Ad Listings WEB*****/

/*** Ad Listings Mobile*****/

paths.adListingMobileCSS = [paths.webroot + "css/v2/listing/*.css", paths.webroot + "css/v2/listing/mobile/*.css", paths.webroot + "css/web/adlistings/*.css", paths.webroot + "css/v3/common/3-3-listings-card.css"].sort();
paths.concatAdListingMobileCssFileName = "auto-gen-mobile-adlistings-" + paths.randomString + ".min.css";
paths.concatAdListingMobileCSSDest = paths.assets + paths.concatAdListingMobileCssFileName;
paths.concatAdListingMobileCSSDest2 = "./wwwroot/css/dev/adlistings-mobile.css";

/*** Ad Listings Mobile*****/

/**** AlchemyListings Scripts Bundling and Minification Web****/

paths.AlchemyListingsWebJS = [
    paths.webroot + "js/v2/common/01-base.js",
    paths.webroot + "js/v2/common/17-gap-analysis-yp.js",
    paths.webroot + "js/v2/common/bootstrap-datepicker.js",
    paths.webroot + "js/v2/common/07-saccordion.js",
    paths.webroot + "js/v2/common/nouislider.js",
    paths.webroot + "js/v2/common/12-scarousel.js",
    paths.webroot + "js/web/alchemylistings/alchemylistings.js"

];

paths.concatAlchemyListingWebJSFileName = "auto-gen-web-alchemylistings-" + paths.randomString + ".min.js";
paths.concatAlchemyListingWebJSDest = paths.assets + paths.concatAlchemyListingWebJSFileName;
paths.concatAlchemyListingWebJSDest2 = "./wwwroot/js/dev/alchemylisting-web.js";

gulp.task("min:alchemylisting-web:js", function () {
    return gulp.src(paths.AlchemyListingsWebJS)
        .pipe(concat(paths.concatAlchemyListingWebJSDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:alchemylisting-web:js:dev", function () {
    return gulp.src(paths.AlchemyListingsWebJS)
        .pipe(concat(paths.concatAlchemyListingWebJSDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("replace:web:alchemylisting:scripts", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-web-alchemylistings-(.*)\.js/g, paths.concatAlchemyListingWebJSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:web:alchemylisting:scripts:dev", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-web-alchemylistings-(.*)-dev/g, paths.concatAlchemyListingWebJSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

/**** AlchemyListings Scripts Bundling and Minification Web****/

/*AdListing Scripts bundling - WEB*/
gulp.task("min:adlisting-web:js", function () {
    return gulp.src([paths.commonAdListingsWebJS, paths.bsnsListingWebJS, paths.adListingWebJS])
        .pipe(concat(paths.concatAdListingWebJSDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:adlisting-web:js:dev", function () {
    return gulp.src([paths.commonAdListingsWebJS, paths.bsnsListingWebJS, paths.adListingWebJS])
        .pipe(concat(paths.concatAdListingWebJSDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
/*AdListing Scripts bundling - WEB*/

/*AdListing Scripts bundling - Mobile*/
gulp.task("min:adlisting-mobile:js", function () {
    return gulp.src([paths.commonAdListingsMobileJS, paths.bsnsListingMobileJS, paths.adListingMobileJS])
        .pipe(concat(paths.concatAdListingMobileJSDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:adlisting-mobile:js:dev", function () {
    return gulp.src([paths.commonAdListingsMobileJS, paths.bsnsListingMobileJS, paths.adListingMobileJS])
        .pipe(concat(paths.concatAdListingMobileJSDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
/*AdListing Scripts bundling - Mobile*/

gulp.task("min:adlisting-web:css", function () {
    return gulp.src(paths.adListingWebCSS)
        .pipe(concat(paths.concatAdListingWebCSSDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:adlisting-web:css:dev", function () {
    return gulp.src(paths.adListingWebCSS)
        .pipe(concat(paths.concatAdListingWebCSSDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:adlisting-mobile:css", function () {
    return gulp.src(paths.adListingMobileCSS)
        .pipe(concat(paths.concatAdListingMobileCSSDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:adlisting-mobile:css:dev", function () {
    return gulp.src(paths.adListingMobileCSS)
        .pipe(concat(paths.concatAdListingMobileCSSDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("replace:web:adlisting:scripts", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-web-adlistings-(.*)\.js/g, paths.concatAdListingWebJSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});
gulp.task("replace:mobile:adlisting:scripts", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-mobile-adlistings-(.*)\.js/g, paths.concatAdListingMobileJSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:web:adlisting:scripts:dev", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-web-adlistings-(.*)-dev/g, paths.concatAdListingWebJSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:mobile:adlisting:scripts:dev", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-mobile-adlistings-(.*)-dev/g, paths.concatAdListingMobileJSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:web:adlisting:css", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-web-adlistings-(.*)\.css/g, paths.concatAdListingWebCssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:web:adlisting:css:dev", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-web-adlistings-(.*)-dev/g, paths.concatAdListingWebCssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:mobile:adlisting:css", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-mobile-adlistings-(.*)\.css/g, paths.concatAdListingMobileCssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

gulp.task("replace:mobile:adlisting:css:dev", function () {
    return gulp.src("./Views/Shared/V2/_Css.cshtml")
        .pipe(replace(/auto-gen-mobile-adlistings-(.*)-dev/g, paths.concatAdListingMobileCssFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});

/*AdDetail Scripts & CSS bundling - WEB*/
gulp.task("min:addetail-web:js", function () {
    return gulp.src([paths.commonAdDetailWebJS, paths.adDetailWebJS])
        .pipe(concat(paths.concatAdDetailWebJSDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:addetail-web:js:dev", function () {
    return gulp.src([paths.commonAdDetailWebJS, paths.adDetailWebJS])
        .pipe(concat(paths.concatAdDetailWebJSDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:addetail-mobile:js", function () {
    return gulp.src([paths.commonAdDetailMobileJS, paths.bsnsAdDetailMobileJS, paths.adDetailMobileJS])
        .pipe(concat(paths.concatAdDetailMobileJSDest2))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:addetail-mobile:js:dev", function () {
    return gulp.src([paths.commonAdDetailMobileJS, paths.bsnsAdDetailMobileJS, paths.adDetailMobileJS])
        .pipe(concat(paths.concatAdDetailMobileJSDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});
gulp.task("min:addetail-web:css", function () {
    return gulp.src(paths.adDetailWebCSS)
        .pipe(concat(paths.concatAdDetailWebCSSDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:addetail-web:css:dev", function () {
    return gulp.src(paths.adDetailWebCSS)
        .pipe(concat(paths.concatAdDetailWebCSSDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:addetail-mobile:css", function () {
    return gulp.src(paths.adDetailMobileCSS)
        .pipe(concat(paths.concatAdDetailMobileCSSDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:addetail-mobile:css:dev", function () {
    return gulp.src(paths.adDetailMobileCSS)
        .pipe(concat(paths.concatAdDetailMobileCSSDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:addetail-mobile-pwa:css", function () {
    return gulp.src(paths.adDetailMobilePwaCSS)
        .pipe(concat(paths.concatAdDetailMobilePwaCSSDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:addetail-mobile-pwa:css:dev", function () {
    return gulp.src(paths.adDetailMobilePwaCSS)
        .pipe(concat(paths.concatAdDetailMobilePwaCSSDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("replace:web:addetail:scripts", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-web-addetail-(.*)\.js/g, paths.concatAdDetailWebJSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});
gulp.task("replace:web:addetail:scripts:dev", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-web-addetail-(.*)-dev/g, paths.concatAdDetailWebJSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});
gulp.task("replace:mobile:addetail:scripts", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-mobile-addetail-(.*)\.js/g, paths.concatAdDetailMobileJSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});
gulp.task("replace:mobile:addetail:scripts:dev", function () {
    return gulp.src("./Views/Shared/V2/_Scripts.cshtml")
        .pipe(replace(/auto-gen-mobile-addetail-(.*)-dev/g, paths.concatAdDetailMobileJSFileName))
        .pipe(gulp.dest('./Views/Shared/V2/'));
});
gulp.task("replace:web:addetail:css", function () {
    return gulp.src("./Views/AdDetail/_AdDetailCss.cshtml")
        .pipe(replace(/auto-gen-web-addetail-(.*)\.css/g, paths.concatAdDetailWebCssFileName))
        .pipe(gulp.dest('./Views/AdDetail/'));
});
gulp.task("replace:web:addetail:css:dev", function () {
    return gulp.src("./Views/AdDetail/_AdDetailCss.cshtml")
        .pipe(replace(/auto-gen-web-addetail-(.*)-dev/g, paths.concatAdDetailWebCssFileName))
        .pipe(gulp.dest('./Views/AdDetail/'));
});
gulp.task("replace:mobile:addetail:css", function () {
    return gulp.src("./Views/AdDetail/_AdDetailCss.cshtml")
        .pipe(replace(/auto-gen-mobile-addetail-(.*)\.css/g, paths.concatAdDetailMobileCssFileName))
        .pipe(gulp.dest('./Views/AdDetail/'));
});
gulp.task("replace:mobile:addetail:css:dev", function () {
    return gulp.src("./Views/AdDetail/_AdDetailCss.cshtml")
        .pipe(replace(/auto-gen-mobile-addetail-(.*)-dev/g, paths.concatAdDetailMobileCssFileName))
        .pipe(gulp.dest('./Views/AdDetail/'));
});
gulp.task("replace:pwa:addetail:css", function () {
    return gulp.src("./Views/AdDetail/_AdDetailCss.cshtml")
        .pipe(replace(/auto-gen-mobile-pwa-addetail-(.*)\.css/g, paths.concatAdDetailMobilePwaCssFileName))
        .pipe(gulp.dest('./Views/AdDetail/'));
});
gulp.task("replace:pwa:addetail:css:dev", function () {
    return gulp.src("./Views/AdDetail/_AdDetailCss.cshtml")
        .pipe(replace(/auto-gen-mobile-pwa-addetail-(.*)-dev/g, paths.concatAdDetailMobilePwaCssFileName))
        .pipe(gulp.dest('./Views/AdDetail/'));
});
/*AdDetail Scripts & CSS bundling - WEB*/

/*Property Common*/
gulp.task("min:profilecommon-web:css", function () {
    return gulp.src(paths.profileCommonWebCSS)
        .pipe(concat(paths.concatProfileCommonWebCSSDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:profilecommon-web:css:dev", function () {
    return gulp.src(paths.profileCommonWebCSS)
        .pipe(concat(paths.concatProfileCommonWebCSSDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:profilecommon-mobile:css", function () {
    return gulp.src(paths.profileCommonMobileCSS)
        .pipe(concat(paths.concatProfileCommonMobileCSSDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:profilecommon-mobile:css:dev", function () {
    return gulp.src(paths.profileCommonMobileCSS)
        .pipe(concat(paths.concatProfileCommonMobileCSSDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:profilecommon-pwa:css", function () {
    return gulp.src(paths.profileCommonPwaCSS)
        .pipe(concat(paths.concatProfileCommonPwaCSSDest2))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min:profilecommon-pwa:css:dev", function () {
    return gulp.src(paths.profileCommonPwaCSS)
        .pipe(concat(paths.concatProfileCommonPwaCSSDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("replace:web:profilecommon:css", function () {
    return gulp.src("./Views/AdDetail/_AdDetailCss.cshtml")
        .pipe(replace(/auto-gen-web-profilecommon-(.*)\.css/g, paths.concatProfileCommonWebCssFileName))
        .pipe(gulp.dest('./Views/AdDetail/'));
});
gulp.task("replace:web:profilecommon:css:dev", function () {
    return gulp.src("./Views/AdDetail/_AdDetailCss.cshtml")
        .pipe(replace(/auto-gen-web-profilecommon-(.*)-dev/g, paths.concatProfileCommonWebCssFileName))
        .pipe(gulp.dest('./Views/AdDetail/'));
});
gulp.task("replace:mobile:profilecommon:css", function () {
    return gulp.src("./Views/AdDetail/_AdDetailCss.cshtml")
        .pipe(replace(/auto-gen-mobile-profilecommon-(.*)\.css/g, paths.concatProfileCommonMobileCssFileName))
        .pipe(gulp.dest('./Views/AdDetail/'));
});
gulp.task("replace:mobile:profilecommon:css:dev", function () {
    return gulp.src("./Views/AdDetail/_AdDetailCss.cshtml")
        .pipe(replace(/auto-gen-mobile-profilecommon-(.*)-dev/g, paths.concatProfileCommonMobileCssFileName))
        .pipe(gulp.dest('./Views/AdDetail/'));
});
gulp.task("replace:pwa:profilecommon:css", function () {
    return gulp.src("./Views/AdDetail/_AdDetailCss.cshtml")
        .pipe(replace(/auto-gen-pwa-profilecommon-(.*)\.css/g, paths.concatProfileCommonPwaCssFileName))
        .pipe(gulp.dest('./Views/AdDetail/'));
});
gulp.task("replace:pwa:profilecommon:css:dev", function () {
    return gulp.src("./Views/AdDetail/_AdDetailCss.cshtml")
        .pipe(replace(/auto-gen-pwa-profilecommon-(.*)-dev/g, paths.concatProfileCommonPwaCssFileName))
        .pipe(gulp.dest('./Views/AdDetail/'));
});

/*Property Common*/

gulp.task("adlistings-dev", gulpSequence("min:adlisting-web:js", "min:adlisting-web:js:dev", "min:adlisting-web:css", "min:adlisting-web:css:dev", "replace:web:adlisting:scripts", "replace:web:adlisting:scripts:dev", "replace:web:adlisting:css", "replace:web:adlisting:css:dev", "min:adlisting-mobile:js", "min:adlisting-mobile:js:dev", "replace:mobile:adlisting:scripts", "replace:mobile:adlisting:scripts:dev", "min:adlisting-mobile:css", "min:adlisting-mobile:css:dev", "replace:mobile:adlisting:css", "replace:mobile:adlisting:css:dev"));
gulp.task("adlistings-prod", gulpSequence("min:adlisting-web:js:dev", "replace:web:adlisting:scripts", "min:adlisting-web:css:dev", "replace:web:adlisting:css", "min:adlisting-mobile:js:dev", "replace:mobile:adlisting:scripts", "min:adlisting-mobile:css:dev", "replace:mobile:adlisting:css"));


gulp.task("alchemylistings-dev", gulpSequence("min:alchemylisting-web:js", "min:alchemylisting-web:js:dev", "replace:web:alchemylisting:scripts", "replace:web:alchemylisting:scripts:dev"));
gulp.task("alchemylistings-prod", gulpSequence("min:alchemylisting-web:js", "replace:web:alchemylisting:scripts", "min:alchemylisting-web:js:dev", "replace:web:alchemylisting:scripts:dev"));

gulp.task("adpost-dev", gulpSequence("min:adpost-web:js", "min:adpost-web:js:dev", "min:adpost-mobile:js", "min:adpost-mobile:js:dev", "min:adpost-web:css", "min:adpost-web:css:dev", "min:adpost-mobile:css", "min:adpost-mobile:css:dev", "min:adpost-pwa:css", "min:adpost-pwa:css:dev", "replace:adpost:scripts", "replace:adpost:css"));
gulp.task("adpost-prod", gulpSequence("min:adpost-web:js:dev", "min:adpost-mobile:js:dev", "min:adpost-web:css:dev", "min:adpost-mobile:css:dev", "min:adpost-pwa:css:dev", "replace:adpost:scripts", "replace:adpost:css"));

gulp.task("addetail-dev", gulpSequence("min:addetail-web:js", "min:addetail-web:js:dev", "min:addetail-web:css", "min:addetail-web:css:dev", "min:addetail-mobile:js", "min:addetail-mobile:js:dev", "min:addetail-mobile:css", "min:addetail-mobile:css:dev", "min:addetail-mobile-pwa:css", "min:addetail-mobile-pwa:css:dev", "replace:web:addetail:scripts", "replace:web:addetail:scripts:dev", "replace:web:addetail:css", "replace:web:addetail:css:dev", "replace:mobile:addetail:scripts", "replace:mobile:addetail:scripts:dev", "replace:mobile:addetail:css", "replace:mobile:addetail:css:dev", "replace:pwa:addetail:css", "replace:pwa:addetail:css:dev"));
gulp.task("addetail-prod", gulpSequence("min:addetail-web:js:dev", "min:addetail-web:css:dev", "min:addetail-mobile:js:dev", "min:addetail-mobile:css:dev", "min:addetail-mobile-pwa:css", "min:addetail-mobile-pwa:css:dev", "replace:web:addetail:scripts", "replace:web:addetail:scripts:dev", "replace:web:addetail:css", "replace:web:addetail:css:dev", "replace:mobile:addetail:scripts", "replace:mobile:addetail:scripts:dev", "replace:mobile:addetail:css", "replace:mobile:addetail:css:dev", "replace:pwa:addetail:css", "replace:pwa:addetail:css:dev"));


gulp.task("profilecommon-dev", gulpSequence("min:profilecommon-web:css", "min:profilecommon-web:css:dev", "min:profilecommon-mobile:css", "min:profilecommon-mobile:css:dev", "min:profilecommon-pwa:css", "min:profilecommon-pwa:css:dev", "replace:web:profilecommon:css", "replace:web:profilecommon:css:dev", "replace:mobile:profilecommon:css", "replace:mobile:profilecommon:css:dev", "replace:pwa:profilecommon:css", "replace:pwa:profilecommon:css:dev"));
gulp.task("profilecommon-prod", gulpSequence("min:profilecommon-web:css", "min:profilecommon-web:css:dev", "min:profilecommon-mobile:css", "min:profilecommon-mobile:css:dev", "min:profilecommon-pwa:css", "min:profilecommon-pwa:css:dev", "replace:web:profilecommon:css", "replace:web:profilecommon:css:dev", "replace:mobile:profilecommon:css", "replace:mobile:profilecommon:css:dev", "replace:pwa:profilecommon:css", "replace:pwa:profilecommon:css:dev"));

/**** AdListings Scripts Bundling and Minification Web****/

gulp.task("static-dev", gulpSequence("min:staticpage-web:css:dev", "min:staticpage-mobile:css:dev", "min:staticpage-pwa:css:dev", "replace:staticpage:css"));
gulp.task("static-prod", gulpSequence("min:staticpage-web:css", "min:staticpage-mobile:css", "min:staticpage-pwa:css", "replace:staticpage:css"));

gulp.task("costing-dev", gulpSequence("min:costing-mobile:js:dev", "min:costing-web:css:dev", "min:costing-mobile:css:dev", "min:costing-pwa:css:dev", "replace:costing:css", "replace:costing:scripts"));
gulp.task("costing-prod", gulpSequence("min:costing-mobile:js", "min:costing-web:css", "min:costing-mobile:css", "min:costing-pwa:css", "replace:costing:css", "replace:costing:scripts"));

gulp.task("upload:cdn", function () {
    var logger = console.log;
    var files = [
        {
            path: paths.assets + paths.concatListingWebJsFileName
        },
        {
            path: paths.assets + paths.concatListingMobileJsFileName
        },
        {
            path: paths.assets + paths.concatListingMobileV2JsFileName
        },
        {
            path: paths.assets + paths.concatListingWebCssFileName
        },
        {
            path: paths.assets + paths.concatListingMobileCssFileName
        },
        {
            path: paths.assets + paths.concatListingMobileV2CssFileName
        },
        {
            path: paths.assets + paths.concatListingWebV2JsFileName
        },
        {
            path: paths.assets + paths.concatListingWebV2CssFileName
        },
        {
            path: paths.assets + paths.concatProfileWebJsFileName
        },
        {
            path: paths.assets + paths.concatProfileMobileJsFileName
        },
        {
            path: paths.assets + paths.concatProfileWebCssFileName
        },
        {
            path: paths.assets + paths.concatProfileMobileCssFileName
        },
        {
            path: paths.assets + paths.concatProfileV2WebJsFileName
        },
        {
            path: paths.assets + paths.concatProfileV2MobileJsFileName
        },
        {
            path: paths.assets + paths.concatProfileV2WebCssFileName
        },
        {
            path: paths.assets + paths.concatProfileV2MobileCssFileName
        },
        {
            path: paths.assets + paths.concatProfileV2PwaCssFileName
        },
        {
            path: paths.assets + paths.concatBlogHomeWebJsFileName
        },
        {
            path: paths.assets + paths.concatStaticWebCSSFileName
        },
        {
            path: paths.assets + paths.concatStaticMobileCSSFileName
        },
        {
            path: paths.assets + paths.concatStaticPWACSSFileName
        },
        {
            path: paths.assets + paths.concatHubPageCsssFileName
        },
        {
            path: paths.assets + paths.concatHubPageWebCsssV1FileName
        },
        {
            path: paths.assets + paths.concatHubPageMobileCsssV1FileName
        },
        {
            path: paths.assets + paths.concatPortfolioPageCssFileName
        },
        {
            path: paths.assets + paths.concatArticlePageJsFileName
        },
        {
            path: paths.assets + paths.concatBlogListPageJsFileName
        },
        {
            path: paths.assets + paths.concatHubPageJsFileName
        },
        {
            path: paths.assets + paths.concatPortfolioPageJsFileName
        },
        {
            path: paths.assets + paths.concatListingLcfV2WebJsFileName
        },
        {
            path: paths.assets + paths.concatListingLcfV2MobileJsFileName
        },
        {
            path: paths.assets + paths.concatAdListingWebJSFileName
        },
        {
            path: paths.assets + paths.concatAdListingWebCssFileName
        },
        {
            path: paths.assets + paths.concatAdListingMobileJSFileName
        },
        {
            path: paths.assets + paths.concatAdListingMobileCssFileName
        },
        {
            path: paths.assets + paths.concatAdDetailWebJSFileName
        },
        {
            path: paths.assets + paths.concatAdDetailWebCssFileName
        },
        {
            path: paths.assets + paths.concatAdDetailMobileJSFileName
        },
        {
            path: paths.assets + paths.concatAdDetailMobileCssFileName
        },
        {
            path: paths.assets + paths.concatAdDetailMobilePwaCssFileName
        },

        {
            path: paths.assets + paths.concatProfileCommonWebCssFileName
        },
        {
            path: paths.assets + paths.concatProfileCommonMobileCssFileName
        },
        {
            path: paths.assets + paths.concatProfileCommonPwaCssFileName
        },

        {
            path: paths.assets + paths.concatListingLcfV2WebCssFileName
        },
        {
            path: paths.assets + paths.concatListingLcfV2MobileCssFileName
        },
        {
            path: paths.assets + paths.concatAdListingWebJSFileName
        },
        {
            path: paths.assets + paths.concatAdListingWebCssFileName
        },
        {
            path: paths.assets + paths.concatAdListingMobileJSFileName
        },
        {
            path: paths.assets + paths.concatAdListingMobileCssFileName
        },
        {
            path: paths.assets + paths.concatAdPostWebJsFileName
        },
        {
            path: paths.assets + paths.concatAdPostMobileJsFileName
        },
        {
            path: paths.assets + paths.concatAdPostWebCssFileName
        },
        {
            path: paths.assets + paths.concatAdPostMobileCssFileName
        },
        {
            path: paths.assets + paths.concatAdPostPWACssFileName
        },
        {
            path: paths.assets + paths.concatListingPWACssFileName
        },
        {
            path: paths.assets + paths.concatAdListingPWACssFileName
        },
        {
            path: paths.assets + paths.concatProfilePWACssFileName
        },
        {
            path: paths.assets + paths.concatGetquotesPWACssFileName
        },
        {
            path: paths.assets + paths.concatAlchemyListingWebJSFileName
        },
        {
            path: paths.assets + paths.concatCostingWebCSSFileName
        },
        {
            path: paths.assets + paths.concatCostingMobileCSSFileName
        },
        {
            path: paths.assets + paths.concatCostingPWACSSFileName
        },
        {
            path: paths.assets + paths.concatListingCostingJsFileName
        },
        {
            path: paths.assets + paths.concatofferbookingCSSFileName
        },
        {
            path: paths.assets + paths.concatofferbookingJSFileName
        },
        {
            path: paths.assets + paths.performanceCssFileName
        },
        {
            path: paths.assets + paths.performanceCssMobileFileName
        }
    ];
    var opts = {
        serviceOptions: ['lscdn', 'VJaEkV1G5J21LkkUrfYekud70dlxhctYrotlMg/NLv4UQu2ZGEtWUvYbH5ff9ffMXCIoW2X/B2vQZ5YcoMRIgA=='], // custom arguments to azure.createBlobService 
        containerName: 'listing-core', // container name in blob 
        containerOptions: { publicAccessLevel: "blob" }, // container options 
        folder: 'assets', // path within container 
        deleteExistingBlobs: false, // true means recursively deleting anything under folder 
        concurrentUploadThreads: 2, // number of concurrent uploads, choose best for your network condition 
        zip: false, // gzip files if they become smaller after zipping, content-encoding header will change if file is zipped 
        metadata: { cacheControl: 'public,max-age=31536000' }, // metadata for each uploaded file 
        testRun: false // test run - means no blobs will be actually deleted or uploaded, see log messages for details 
    };
    deploy(opts, files, logger, function (err) {
        if (err) {
            console.log("Error deploying", err);
        }
        console.log('Job\'s done!');
    });
});

gulp.task("dev", gulpSequence("clean:assets", "min:listing-web:js", "min:listing-web:js:dev", "min:listing-mobile:js",
    "min:performance-web-v1:css:dev", "min:performance-mobile-v1:css:dev", "replace:min:performance-web-v1:css:dev", "replace:min:performance-mobile-v1:css:dev",
    "min:listing-mobile:js:dev", "replace:web:listing:scripts", "replace:web:listing:scripts:dev", "replace:mobile:listing:scripts",
    "replace:mobile:listing:scripts:dev", "min:listing-web:css", "min:listing-web:css:dev", "min:listing-mobile:css", "min:listing-mobile:css:dev",
    "replace:web:listing:css", "replace:web:listing:css:dev", "replace:mobile:listing:css", "replace:mobile:listing:css:dev",
    "min:profile-web:js", "min:profile-web:js:dev", "min:profile-mobile:js", "min:profile-mobile:js:dev", "min:profile-web:css", "min:profile-web:css:dev", "min:profile-mobile:css",
    "min:profile-mobile:css:dev", "replace:web:profile:scripts", "replace:web:profile:scripts:dev", "replace:mobile:profile:scripts", "replace:mobile:profile:scripts:dev",
    "replace:web:profile:css", "replace:web:profile:css:dev", "replace:mobile:profile:css", "replace:mobile:profile:css:dev",
    "min:profilev2-web:js", "min:profilev2-web:js:dev", "min:profilev2-mobile:js", "min:profilev2-mobile:js:dev", "min:profilev2-web:css", "min:profilev2-web:css:dev", "min:profilev2-mobile:css",
    "min:profilev2-mobile:css:dev", "min:profilev2-pwa:css", "min:profilev2-pwa:css:dev", "replace:web:profilev2:scripts", "replace:web:profilev2:scripts:dev",
    "replace:mobile:profilev2:scripts", "replace:mobile:profilev2:scripts:dev",
    "replace:web:profilev2:css", "replace:web:profilev2:css:dev", "replace:mobile:profilev2:css", "replace:mobile:profilev2:css:dev", "replace:pwa:profilev2:css", "replace:pwa:profilev2:css:dev",
    "min:bloghome-web:js", "min:bloghome-web:js:dev", "replace:web:bloghome:scripts", "replace:web:bloghome:scripts:dev",
    "static-dev",
    "min:hubpage-web:js", "min:hubpage-web:js:dev", "min:hubpage-web:css", "min:hubpage-web:css:dev", "min:portfoliopage-web:js", "min:portfoliopage-web:js:dev",
    "min:articlepage-web:js", "min:articlepage-web:js:dev", "min:bloglistpage-web:js", "min:bloglistpage-web:js:dev",
    "min:porfoliopage-web:css", "min:portfoliopage-web:css:dev", "replace:web:hubpage:scripts", "replace:web:hubpage:scripts:dev", "replace:web:portfoliopage:scripts", "replace:web:portfoliopage:scripts:dev",
    "replace:web:articlepage:scripts", "replace:web:articlepage:scripts:dev", "replace:web:bloglistpage:scripts", "replace:web:bloglistpage:scripts:dev",
    "replace:web:hubpage:css", "replace:web:hubpage:css:dev", "replace:web:portfoliopage:css", "replace:web:portfoliopage:css:dev", "min:listingv2-web:js", "min:listingv2-web:js:dev",
    "replace:web:listingv2:scripts", "replace:web:listingv2:scripts:dev", "min:listingv2-web:css", "min:listingv2-web:css:dev", "replace:web:listingv2:css", "replace:web:listingv2:css:dev",
    "replace:web:hub-articel-v1:css", "replace:web:hub-articel-v1:css:dev", "replace:mobile:hub-articel-v1:css", "replace:mobile:hub-articel-v1:css:dev", "min:hub-articel-web-v1:css", "min:hub-articel-web-v1:css:dev", "min:hub-articel-mobile-v1:css", "min:hub-articel-mobile-v1:css:dev",
    "min:listingv2-mobile:js", "min:listingv2-mobile:js:dev", "min:lcfv2-web:css", "min:lcfv2-web:css:dev", "min:lcfv2-mobile:css", "min:lcfv2-mobile:css:dev", "min:lcfv2web:js", "min:lcfv2web:js:dev", "min:lcfv2-mobile:js", "min:lcfv2-mobile:js:dev", "replace:lcf:css:js", "replace:mobile:listingv2:scripts", "replace:mobile:listingv2:scripts:dev", "min:listingv2-mobile:css", "min:listingv2-mobile:css:dev",
    "costing-dev", "offerbooking-dev",
    "replace:mobile:listingv2:css", "replace:mobile:listingv2:css:dev", "min:listing-pwa:css", "min:listing-pwa:css:dev", "replace:mobile:listing-pwa:css", "min:adlisting-pwa:css", "min:adlisting-pwa:css:dev", "replace:mobile:adlisting-pwa:css", "min:profile-pwa:css", "min:profile-pwa:css:dev", "replace:mobile:profile-pwa:css", "min:getquotes-pwa:css", "min:getquotes-pwa:css:dev", "replace:mobile:getquotes-pwa:css", "append:build-time", "adlistings-dev", "adpost-dev", "addetail-dev", "profilecommon-dev", "alchemylistings-dev"));


gulp.task("production", gulpSequence("clean:assets", "replace:search:enpoint:url", "replace:search:enpoint:urlv2", "min:listing-web:js:dev", "min:listing-mobile:js:dev", "replace:web:listing:scripts",
    "replace:mobile:listing:scripts", "min:listing-web:css:dev", "min:listing-mobile:css:dev", "replace:web:listing:css", "replace:mobile:listing:css",
    "min:profile-web:js:dev", "min:profile-mobile:js:dev", "replace:web:profile:scripts", "replace:mobile:profile:scripts",
    "min:profile-web:css:dev", "min:profile-mobile:css:dev", "replace:web:profile:css", "replace:mobile:profile:css",
    "min:profilev2-web:js", "min:profilev2-web:js:dev", "min:profilev2-mobile:js", "min:profilev2-mobile:js:dev", "min:profilev2-web:css", "min:profilev2-web:css:dev", "min:profilev2-mobile:css",
    "min:profilev2-mobile:css:dev", "min:profilev2-pwa:css", "min:profilev2-pwa:css:dev",
    "replace:web:profilev2:scripts", "replace:web:profilev2:scripts:dev",
    "replace:mobile:profilev2:scripts", "replace:mobile:profilev2:scripts:dev",
    "replace:web:profilev2:css", "replace:web:profilev2:css:dev", "replace:mobile:profilev2:css", "replace:mobile:profilev2:css:dev", "replace:pwa:profilev2:css", "replace:pwa:profilev2:css:dev",
    "min:bloghome-web:js:dev", "replace:web:bloghome:scripts", "static-prod",
    "min:hubpage-web:js:dev", "min:hubpage-web:css:dev", "min:portfoliopage-web:js:dev", "min:articlepage-web:js:dev", "min:bloglistpage-web:js:dev", "min:portfoliopage-web:css:dev", "replace:web:hubpage:scripts",
    "replace:web:portfoliopage:scripts", "replace:web:articlepage:scripts", "replace:web:bloglistpage:scripts", "replace:web:hubpage:css", "replace:web:portfoliopage:css",
    "min:hub-articel-web-v1:css:dev", "min:hub-articel-mobile-v1:css:dev", "replace:web:hub-articel-v1:css", "replace:mobile:hub-articel-v1:css",
    "min:listingv2-web:js:dev", "min:lcfv2-web:css:dev", "min:lcfv2-mobile:css:dev", "min:lcfv2web:js:dev", "min:lcfv2-mobile:js:dev", "replace:lcf:css:js", "replace:web:listingv2:scripts", "min:listingv2-web:css:dev", "replace:web:listingv2:css", "min:listingv2-mobile:js:dev", "replace:mobile:listingv2:scripts", "min:listingv2-mobile:css:dev", "replace:mobile:listingv2:css", "min:listing-pwa:css:dev", "replace:mobile:listing-pwa:css", "min:adlisting-pwa:css:dev", "replace:mobile:adlisting-pwa:css",
    "min:profile-pwa:css:dev", "replace:mobile:profile-pwa:css", "min:getquotes-pwa:css:dev", "replace:mobile:getquotes-pwa:css", "append:build-time", "adlistings-prod", "adpost-prod", "addetail-prod", "profilecommon-prod",
    "costing-prod", "offerbooking-live",
    "min:performance-web-v1:css", "min:performance-mobile-v1:css", "replace:min:performance-web-v1:css", "replace:min:performance-mobile-v1:css",
    "alchemylistings-prod", "upload:cdn"));

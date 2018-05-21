/**
 * Feed reader Jasmine test spec
 * https://jasmine.github.io/
 */

$(function() {

/**
 * Test feed array
 */
    describe('RSS Feeds', function() {
        // test if the feed array is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

            // test if the url is defined
            it( 'feeds have a not empty and defined url', function() {
                // loop through the contents of the feed array
                allFeeds.forEach(function(feed){
                    // test url
                    expect(feed.url).toBeDefined();
                    expect(feed.url.length).toBeGreaterThan(0);
                });

            });

            // test if the name is defined
            it( 'feeds have a not empty and defined name', function() {
                // loop through the contents of the feed array
                allFeeds.forEach(function(feed){
                    // test name
                    expect(feed.name).toBeDefined();
                    expect(feed.name.length).toBeGreaterThan(0);
                });


            });    


    });

/**
 * Test the menu 
 */
    describe('The menu', function(){

        // test if the menu is hidden
        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // test menu toggling
        it('is toggled on click', function(){
            $('.menu-icon-link').click();            
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

/**
 * Test first feed loading
 */
    describe('Initial Entries', function() {

        // load the first feed before the test
        beforeEach(function(done){
            loadFeed(0, done);
        });

        // test if the initial feed is displayed on page
        it('should load initial entries', function(){       
            expect($('.feed .entry').length).toBe(10);
        });

    });

/**
 * Test new feed selection
 */
    describe('New feed Selection', function() {
        let contentAfter = 0;
        let contentBefore = 0;
        // before each test save the onpage feed and load next feed
        beforeEach(function(done){
            loadFeed(0,function(){
                contentBefore = $('.feed').html();            
                loadFeed(1,function(){
                    contentAfter = $('.feed').html();            
                    done();
                });
            });
            
        });
                
        // Test if the second feed is different from the previus one
        it('the feed is updated', function(){
                expect(contentAfter).not.toBe(contentBefore);
        });

    });

}());
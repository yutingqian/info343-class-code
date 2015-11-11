describe('Tasks List App', function() {
    beforeEach(function() {
        browser.get('http://localhost:8000');
    });

    it('should have the proper title', function() {
        expect(browser.getTitle()).toEqual('My Tasks');
    })
});

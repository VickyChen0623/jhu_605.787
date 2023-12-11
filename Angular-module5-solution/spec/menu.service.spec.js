describe('menuService', function () {

  var menuService;
  var $httpBackend;
  // var ApiBasePath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      // ApiBasePath = $injector.get('ApiBasePath');
    });
  });

  it('should return menu item', async function() {
    $httpBackend.whenGET('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/L/menu_items/1.json').respond({
      "description": "chunks of chicken, breaded and deep-fried with sauce and scallions; white meat by request: for pint $1 extra, for large $2 extra",
      "name": "General Tso's Chicken",
      "price_large": 9.75,
      "short_name": "L2"
    });
    const response = await menuService.getMenuItem("L1");
    expect(response.data).toEqual({
      "description": "chunks of chicken, breaded and deep-fried with sauce and scallions; white meat by request: for pint $1 extra, for large $2 extra",
      "name": "General Tso's Chicken",
      "price_large": 9.75,
      "short_name": "L2"
    });
    $httpBackend.flush();
  });

  it('should not return menu item', async function() {
    $httpBackend.whenGET('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/L/menu_items/1.json').respond(null);
    const response = await menuService.getMenuItem("L30");
    expect(response.data).toEqual(null);
    $httpBackend.flush();
  });
});

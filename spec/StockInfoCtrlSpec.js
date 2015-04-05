describe("StockInfoCtrl", function() {
    var scope,
        controller,
        stocksSpy,
        errorServiceSpy,
        fakeStockInfo = { property: true},
        errorMsg = "error",
        BAD_SYMBOL = "";

    // Load application module
    beforeEach(module('stockApp'));

    beforeEach(inject(function ($rootScope, $controller, $q, stocks) {
        scope = $rootScope.$new();

        //stocksSpy = jasmine.createSpyObj('stockSpy', ['getStock']);
        stocksSpy = stocks;
        errorServiceSpy = jasmine.createSpyObj('errorServiceSpy', ['showError']);

        spyOn(stocksSpy, "getStock").and.callFake(function(symbol) {
            var d = $q.defer();
            if (symbol === BAD_SYMBOL) {
                d.reject(errorMsg);
            } else {
                d.resolve(fakeStockInfo);
            }
            return d.promise;
        });

        controller = $controller('StockInfoCtrl', {
            $scope: scope,
            stocks: stocksSpy,
            errorService: errorServiceSpy
        });
    }));

    it("Should exist", function() {
        expect(controller).toBeDefined();
    });

    it('should set stock info to an empty object', function() {
        expect(scope.stockInfo).toBeDefined();
    });

    it('should set the showInfo to false to hide the card by default', function() {
        expect(scope.showInfo).toBeFalsy();
    });

    it('should get a stock info when user clicks search with a symbol', function() {
        var symbol = GOOD_SYMBOL;
        scope.searchPrice(symbol);
        expect(stocksSpy.getStock).toHaveBeenCalledWith(symbol);
    });

    it('gets a stock it should set the showInfo to true', inject( function($rootScope) {
        var symbol = GOOD_SYMBOL;
        scope.searchPrice(symbol);
        $rootScope.$apply();
        expect(stocksSpy.getStock).toHaveBeenCalledWith(symbol);
        expect(scope.showInfo).toBeTruthy();
    }));

    it('gets a stock it should set the stockInfo to the return of the getStock from the stocks service', inject( function($rootScope) {
        var symbol = GOOD_SYMBOL;
        scope.searchPrice(symbol);
        $rootScope.$apply();
        expect(stocksSpy.getStock).toHaveBeenCalledWith(symbol);
        expect(scope.stockInfo).toBe(fakeStockInfo);
    }));

    it('should set showInfo to false and reset the stockInfo to an empty object when getStock fails', inject( function($rootScope) {
        // Get a real stock
        var symbol = GOOD_SYMBOL;
        scope.searchPrice(symbol);
        $rootScope.$apply();
        expect(scope.stockInfo).toBe(fakeStockInfo);

        // Try getting an empty stock
        var symbol = BAD_SYMBOL;
        scope.searchPrice(symbol);
        $rootScope.$apply();
        expect(stocksSpy.getStock).toHaveBeenCalledWith(symbol);
        expect(errorServiceSpy.showError).toHaveBeenCalledWith(errorMsg);
        expect(scope.showInfo).toBeFalsy();
    }));
})

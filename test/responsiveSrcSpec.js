describe('ResponsiveSrc', function() {

  describe('URI', function() {
    var url, uri;

    beforeEach(function() {
      url = "http://local.com/a/b/c/d.jpg?q=1&r=2&s=t";
      uri = new ResponsiveSrc.URI(url);
    });

    it("#fullPath", function() {
      expect(uri.fullPath()).toBe("http://local.com/a/b/c/d.jpg");
    });

    it("#queryString", function(){
      expect(uri.queryString()).toBe("?q=1&r=2&s=t");
    });

    it("#queryString with args", function(){
      expect(uri.queryString({
        x: 1,
        a: 4,
        z: 2
      })).toBe("?x=1&a=4&z=2");
    });

    it("#getNewUrl", function(){
      expect(uri.getNewUrl({a: 1, m: 2, c: 3, x: 4, l: 5})).toBe("http://local.com/a/b/c/d.jpg?a=1&m=2&c=3&x=4&l=5");
    });

  });


  describe('#inializer', function() {
    var img;
    beforeEach(function() {
      img = new Image();
      img.width = 100;
      img.src = "test.jpg?loader"
    });

    it("will load correct image size", function() {
      var resp = new ResponsiveSrc(img);
      var uri = new ResponsiveSrc.URI(img.src);
      expect(uri.queryString()).toBe("?w=100")
    });
  });
});

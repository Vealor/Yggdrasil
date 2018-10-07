function getIntersect(obj1, obj2){
  var k1 = Object.keys(obj1);
  return k1.filter(function(x){
    return obj2[x] !== undefined;
  });
}

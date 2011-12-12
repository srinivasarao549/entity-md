describe("adding and removing objects fre_md e_md.objects", function(){

    it("must store an object in e_md.objects, and return that object when adding", function(){
        var e_md = anew(entity_md),
            obj = e_md.add({x: 3})

        expect(e_md.objects.indexOf(obj) != -1).toBeTruthy()
    })
    
    it("must remove objects fre_md e_md.objects on request", function(){
        var e_md = anew(entity_md),
            obj = e_md.add({x: 2}),
            obj2 = e_md.add({x: 2})
        
        expect(e_md.objects.indexOf(obj) != -1).toBeTruthy()
        expect(e_md.objects.indexOf(obj2) != -1).toBeTruthy()

        e_md.remove(obj)            
        expect(e_md.objects.indexOf(obj) != -1).toBeFalsy()
        expect(e_md.objects.indexOf(obj2) != -1).toBeTruthy()
        
    })

    it("must not delete any extant objects if a non-e_md object is submitted to remove", function(){
        var e_md = anew(entity_md),
            obj = e_md.add({x: 2}),
            obj2 = e_md.add({x: 2})
        
        expect(e_md.objects.indexOf(obj) != -1).toBeTruthy()
        expect(e_md.objects.indexOf(obj2) != -1).toBeTruthy()

        e_md.remove({x: 2})            
        expect(e_md.objects.indexOf(obj) != -1).toBeTruthy()
        expect(e_md.objects.indexOf(obj2) != -1).toBeTruthy()            
    })
    
    it("must allow removal of all objects", function(){
        var e_md = anew(entity_md),
            obj = e_md.add({x: 2}),
            obj2 = e_md.add({x: 2})
        
        expect(e_md.objects.indexOf(obj) != -1).toBeTruthy()
        expect(e_md.objects.indexOf(obj2) != -1).toBeTruthy()

        e_md.remove_all()
                    
        expect(e_md.objects.indexOf(obj) != -1).toBeFalsy()
        expect(e_md.objects.indexOf(obj2) != -1).toBeFalsy()
        expect(e_md.objects.length).toEqual(0)
    })


})

describe("finding objects fre_md e_md.object", function(){

    it("must be able to find objects by their constructor", function(){
        var e_md = anew(entity_md),
            C = function(){ this.x = 1}
            
        e_md.add(new C)
        e_md.add(new C)
        e_md.add(new C)

        // try finding with the ctor
        var objs = e_md.find_instances(C)

        objs.forEach(function(o){
            expect(o.x).toEqual(1)
        })

        expect(objs.length).toEqual(3)            
        
        // try se_mdething that's not it's ctor, but still in chain
        objs = e_md.find_instances(Object)
        expect(objs.length).toEqual(0)
    })

    it("must be able to find objects by their constructor with submitted array", function(){
        var e_md = anew(entity_md),
            C = function(){ this.x = 1},    
            obj1 = e_md.add(new C),
            obj2 = e_md.add(new C),
            obj3 = e_md.add({x: 2})
            
                
        e_md.add(new C)

        // try finding with the ctor
        var objs = e_md.find_instances(C, [obj1, obj2, obj3])

        objs.forEach(function(o){
            expect(o.x).toEqual(1)
        })

        expect(objs.length).toEqual(2)            
        
        // try se_mdething that's not it's ctor, but still in chain
        objs = e_md.find_instances(Object, [obj1, obj2, obj3])
        expect(objs.length).toEqual(1)
    })

    it("must be able to find objects by distance", function(){
        var e_md = anew(entity_md)
        
        e_md.add({x: 1, y: 2})
        e_md.add({x: 1.2, y: 3})
        e_md.add({x: 2, y: 2})
        
        
        var obj = e_md.find_nearest({x: 0, y: 0})
        
        expect(obj.x).toEqual(1)
        
    })
    
    it("must be able to find objects by distance with submitted array", function(){
        var e_md = anew(entity_md),
            obj1 = e_md.add({x: 1, y: 2}),
            obj2 = e_md.add({x: 1.2, y: 3}),
            obj3 = e_md.add({x: 2, y: 2})
        
        
        var obj = e_md.find_nearest({x: 0, y: 0}, [obj2, obj3])
        
        expect(obj).toEqual(obj3)
        
    })
    
    it("must be able to find objects by attr", function(){
        
        var e_md = anew(entity_md)
        
        e_md.add({x: 1, y: 2, id: "colbert"})
        e_md.add({x: 1, y: 3})
        e_md.add({x: 2, y: 2})
        
        var obj = e_md.find_by_attr({id: "colbert"})
        
        expect(obj[0].x).toEqual(1)
    })
    
    it("must return empty if no object with attrs is found", function(){
        
        var e_md = anew(entity_md)
        
        e_md.add({x: 1, y: 2, id: "colbert"})
        e_md.add({x: 1, y: 3})
        e_md.add({x: 2, y: 2})
        
        var objs = e_md.find_by_attr({id: "colberta"})
        
        expect(objs.length).toEqual(0)
    })

    it("must return objects by ID with submitted array", function(){
        var e_md = anew(entity_md),
            obj1 = {x: 1, y: 2, id: "colbert"},
            obj2 = {x: 1, y: 3},
            obj3 = {x: 2, y: 2}

        e_md.add(obj1)
        e_md.add(obj2)
        e_md.add(obj3)
        
        var obj = e_md.find_by_attr({id: "colbert"}, [obj1, obj3])
        
        expect(obj[0]).toBe(obj1)
    })
    
})

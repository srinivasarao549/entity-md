void function(context){

   // main controlling object
    var entity_md = {
        
        // ctor and attrs
        init: function(){
            this.objects = []
        },
        objects_modified: false,
    
//----------------------------------------------------------//
//              OBJECT TRACKING METHODS
//----------------------------------------------------------//
    
        add: function(object){
            // store
            this.objects.push(object)
            this.objects_modified = true
            return object
        },
                
        remove: function(object){
            var index = this.objects.indexOf(object)
            if ( index >= 0 ){
                this.objects.splice(index, 1)      
                this.objects_modified = true                      
            }
        },
        
        remove_all: function(){
            this.objects = []
        },
        
        find_instances: function(ctor, obj_set){
            var objs = obj_set || this.objects,
                return_objs = []
            
            objs.forEach(function(o){
                if ( o.constructor == ctor ) 
                    return_objs.push(o)
            })
            return return_objs
        },
        
        find_nearest: function(reference_object, obj_set){
            var objs = obj_set || this.objects,
                nearest_obj, nearest_distance
            
            objs.forEach(function(o){
                var diffx = Math.abs(reference_object.x - o.x),
                    diffy = Math.abs(reference_object.y - o.y),
                    distance = diffy*diffy + diffx*diffx
                    
                if ( nearest_distance === undefined ){    
                    nearest_distance = distance
                    nearest_obj = o
                } else if ( nearest_distance > distance ){
                    nearest_distance = distance
                    nearest_obj = o
                }
            })

            return nearest_obj
        },

        find_by_id: function(id, obj_set){
            var objs = obj_set || this.objects,
                obj = null
                
            objs.forEach(function(o){
                if ( o.id == id ) obj = o
            })
            return obj
        }
        
    };

    context["entity_md"] = entity_md

}(this)

<template>
<div>
    <div class="row">{{editAddText}} Order</div>
    <form @submit.prevent="submit($event)">
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" v-model="order.name" type="text" placeholder="Name" required>
            </div>
        </div>
        <div class="field">
            <label class="label">Price</label>
            <div class="control">
                <input class="input" v-model="order.price" type="number" min="1" placeholder="Price" required>
            </div>
        </div>
        <div class="field">
            <label class="label">Notes</label>
            <div class="control">
                <textarea class="input" v-model="order.notes" placeholder="Notes" required></textarea>
            </div>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button class="button  is-link">{{editAddText}} Order</button>
            </div>
        </div>
    </form>
</div>
</template>

<script>
export default {
    name:'PlaceOrder',
    props:['editId'],
    data(){
        return {
            order:{
                name:'',
                price:'',
                notes:'',
            }
        }
    },
    watch:{
        editId(val){
            if(val){
                let current = this.$store.state.orders.filter(i => {
                    if(i.id==val) return true;
                    else false;
                })[0]

                this.order.name = current.name;
                this.order.price = current.price;
                this.order.notes = current.notes;
            }else{
                this.resetFormData()
            }
        }
    },
    computed:{
        editAddText(){
            return this.editId ? "Edit":"Add";
        }
    },
    methods:{
        resetFormData() {
                this.order = {
                name:'',
                price:'',
                notes:'',
                }
        },
        submit(event){
            event.preventDefault();  
            let payload = this.order;
            
            if(!this.editId){
                payload['id'] =  this.$store.state.orders.length != 0 ? Math.max(...this.$store.state.orders.map(i => i.id)) + 1 : 0;
                const order = {...payload};
                this.$store.dispatch('addOrder',order);
                this.resetFormData()
            }else{
                payload['id'] =   this.editId;
                const order = {...payload}
                this.$store.dispatch('editOrder',order);
            }
        }
    }
}
</script>

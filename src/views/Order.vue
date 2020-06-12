<template>
    <div class="row">
        <div class="row">
            <h1 class="title">
                Order List
            </h1>
        </div>
        <div class="columns">
            <div class="column is-three-fifths">
                <table v-if="data.length!=0" class="table">
                    <thead>
                        <tr>
                            <th v-for="(column,index) in columns" :key="index">{{column}}</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row,index_row) in data" :key="index_row" v-bind:class="{ editing: editId === row.id }" >
                            <td v-for="(column,index) in columns" :key="index"> {{row[column]}} </td>
                            <td>
                                <p class="buttons">
                                    <a class="button is-small is-primary" @click="editOrder(row)">Edit</a>
                                    <a class="button is-small is-danger" @click="deleteOrder(row.id)">Delete</a>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-else class="notification is-info">
                    No data found
                </div>
            </div>
            <div class="column">
                <a href="#" v-show="showAdd == false" @click="addOrder()" class="button is-small is-danger" style="float:right;margin-top:-20px" >X</a>
                <PlaceOrder :editId="editId"></PlaceOrder>
            </div>
        </div>
    </div>
</template>

<script>

import PlaceOrder from '../components/PlaceOrder.vue';

export default {
    name:'Orders',
    components:{
        PlaceOrder,
    },
    data() {
            return {
                showAdd:true,
                editId:'',
            }
        },
    computed:{
            data(){
                return this.$store.state.orders;
            },
            columns(){
                return this.$store.state.orders.length > 0 ?
                       Object.keys(this.$store.state.orders[0]) : []
            }
        },
    methods:{
            editOrder(order){
                this.editId = order.id;
                this.showAdd = false;
            },
            addOrder(){
                this.editId = "";
                this.showAdd = true;
            },
            deleteOrder(order){
                this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.value) {
                            this.$store.dispatch('removeOrder',order).then((res)=>{
                                if(res) this.$swal(
                                        'Deleted!',
                                        'Order has been deleted.',
                                        'success'
                                        )
                                else this.$swal(
                                        'Fail!',
                                        'Fail to delete order.',
                                        'error'
                                        )
                            });
                        }
                    })
            }
        }
}
</script>

<template>
    <h1>
        Malla Curricular Por Semestres
        <router-link :to="'create'" v-if="rol">
            <button class="btn btn-outline-success">
                <i className="fa-solid fa-plus style='color: blue'"></i>    
            </button>
        </router-link>
    </h1>

    <table class="table table-hover align-middle">
        <thead>
            <th>No.</th>
            <th>Descripción</th>
            <th>Acciones</th>
        </thead>
        <tbody>
            <tr v-for="semesters in semesters" :key="semesters.id">
                <td>{{ semesters.id }}</td>
                <td>{{ semesters.name }}</td>
                <td>
                    <router-link :to="'/subjects/' + semesters.id + '/semester'">
                        <button class="btn btn-outline-info">
                            <i className="fa-regular fa-eye"></i>
                        </button>
                    </router-link>
                    <router-link :to=" semesters.id + '/edit'" v-if="rol">
                        <button class="btn btn-outline-primary">
                            <i className="fa-solid fa-pen"></i>
                        </button>
                    </router-link>
                    <button class="btn btn-outline-danger" href="javascript:void(0)" @click="deleteSemester(semesters.id)" v-if="rol">
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
       async created(){
            const options = {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization' : 'Token ' + localStorage.getItem('authToken')
                },
            }
            const response = await fetch("http://localhost:8000/api/semester", options);
            const data = await response.json();
            this.semesters = data.data;
        },
        data(){
            return{
                semesters: [],
                rol: this.evaluateRol()
            }
        },
       methods:{
            async deleteSemester(id){
                const options = {
                method: "DELETE",
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization' : 'Token ' + localStorage.getItem('authToken')
                },
            }
                const response = await fetch("http://localhost:8000/api/semester/"+ id +"/destroy", options);
                const data = await response.json();
                this.semestersAll();           
            },
            async semestersAll(){
            const options = {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization' : 'Token ' + localStorage.getItem('authToken')
                },
            }
            const response = await fetch("http://localhost:8000/api/semester", options);
            const data = await response.json();
            this.semesters = data.data;
            },
            evaluateRol(){

                this.rol = localStorage.getItem('rol')

                if( this.rol == 1){
                    return true
                }else{
                    return false
                }
            }
       }
    }
</script>

<style scoped>
    button{
        margin: 1%
    }
    h1{
        font-weight: bolder;
        font-family:sans-serif, 'Arial Narrow', Arial;
        text-align: center;
    }
</style>
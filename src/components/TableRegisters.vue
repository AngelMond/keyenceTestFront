<!-- <template>
    <section class="container d-flex align-center">
        <v-row cols="12" justify="center" class="d-flex align-center">
            <v-col cols="7">
                <v-card>
                    <v-table fixed-header height="300px">
                        <thead>
                            <tr>
                                <th class="text-left">User ID</th>
                                <th class="text-left">Username</th>
                                <th class="text-left">Date</th>
                                <th class="text-left">Punch In</th>
                                <th class="text-left">Punch Out</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in fileData" :key="item.index">
                                <td>{{ item.UserID }} </td>
                                <td>{{ item.UserName }}</td>
                                <td>{{ item.Date }}</td>
                                <td>{{ item.PunchIn }}</td>
                                <td>{{ item.PunchOut }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-col>
        </v-row>

    </section>
</template>
<script>
import { apiGetAllRegisters } from '../api/xlsxFiles/apiGetAllRegisters';
export default {
    mounted() {
        this.getRegisters()
    },

    data() {
        return {
            registers: [{}],
            headers: [
                { text: 'UserID', value: 'userID' },
                { text: 'Username', value: 'username' },
                { text: 'Date', value: 'date' },
                { text: 'PunchIn', value: 'punchIn' },
                { text: 'PunchOut', value: 'punchOut' },
                { text: 'Actions', value: 'actions' },
            ],
            search: '',
            fileData: [
                {
                    Date: "44562",
                    PunchIn: "0.37777777777777777",
                    PunchOut: "0.25",
                    UserID: "0002",
                    UserName: "BBB",
                },
                {
                    Date: "44562",
                    PunchIn: "0.37777777777777777",
                    PunchOut: "0.25",
                    UserID: "0002",
                    UserName: "BBB",
                },
                {
                    Date: "44562",
                    PunchIn: "0.37777777777777777",
                    PunchOut: "0.25",
                    UserID: "0002",
                    UserName: "BBB",
                },
                {
                    Date: "44562",
                    PunchIn: "0.37777777777777777",
                    PunchOut: "0.25",
                    UserID: "0002",
                    UserName: "BBB",
                },
                {
                    Date: "44562",
                    PunchIn: "0.37777777777777777",
                    PunchOut: "0.25",
                    UserID: "0002",
                    UserName: "BBB",
                },
                {
                    Date: "44562",
                    PunchIn: "0.37777777777777777",
                    PunchOut: "0.25",
                    UserID: "0002",
                    UserName: "BBB",
                },
                {
                    Date: "44562",
                    PunchIn: "0.37777777777777777",
                    PunchOut: "0.25",
                    UserID: "0002",
                    UserName: "BBB",
                }
            ],
        };
    },
    methods: {
        handleFileUpload(event) {
            console.log("se cargo el archivo")
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                const headers = jsonData[0];
                const records = jsonData.slice(1);


                //   console.log(data)

                this.data = records.map((record) => {
                    // console.log(record)
                    const item = {};
                    headers.forEach((header, index) => {
                        // console.log(header)
                        item[header] = record[index];
                    });
                    //Get object with each file of the xslx
                    this.fileData.push(item)
                    return item;
                });
            };
            reader.readAsArrayBuffer(file);
            console.log(this.fileData)
        },
        async getRegisters() {
            try {
                const response = await apiGetAllRegisters();
                console.log(response);
                // this.registers = response;

            } catch (error) {
                console.log(err);
            }
        },

        editItem(item) {
            // Lógica para editar un elemento en la tabla
        },
        deleteItem(item) {
            // Lógica para eliminar un elemento de la tabla
        },
    },
};
</script> -->

<template>
    <section class="container py-10" >
        <!-- Show loading screen -->
        <v-overlay :model-value="overlay" class="align-center justify-center" persistent>
            <v-progress-circular color="red-darken-2" indeterminate size="64"></v-progress-circular>
        </v-overlay>

        <v-row cols="12" justify="center" class="my-10">
            <v-col cols="11" sm="10" md="10" lg="10" xl="10">
                <v-card v-if="hasRegisters">
                    <h3 class="py-3 text-center text-red-darken-2">Registers</h3>
                    <v-table fixed-header >
                        <thead>
                            <tr class="border">
                                <th class="text-left">User ID</th>
                                <th class="text-left">Username</th>
                                <th class="text-left">Date</th>
                                <th class="text-left">Punch In</th>
                                <th class="text-left">Punch Out</th>
                                <th class="text-left">Save</th>
                                <th class="text-left">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item._id">
                                <td>
                                    <input  class="table-input" v-model="item.userId" />
                                </td>
                                <td>
                                    <input  class="table-input" v-model="item.username" />
                                </td>
                                <td>
                                    <input  class="table-input" v-model="item.date" />
                                </td>
                                <td>
                                    <input  class="table-input" v-model="item.punchIn" />
                                </td>
                                <td>
                                    <input  class="table-input" v-model="item.punchOut" />
                                </td>
                                <td>
                                    <v-btn class="primary" @click="guardarItem(item)">Save</v-btn>
                                </td>
                                <td>
                                    <v-btn class="secondary" @click="eliminarItem(item)">Delete</v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                    <v-row justify="between" class="ma-2">
                        <v-col >
                            <p class="sencundary text-grey-darken-1"  >To edit a row click over the value</p>
                        </v-col>
                        <v-col >
                            <v-btn class="sencundary" @click="agregarItem">ADD</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
                <v-card v-if="!hasRegisters && !isErrorServer" class="pa-5">
                    <h3 class="text-red-darken-2 text-center">
                        There's no registers
                    </h3>
                    <p class="text-center">
                        To create a table of registers go to
                        <router-link to="/readFile" class="text-red-darken-2 text-decoration-underline">
                            Upload file
                        </router-link>
                    </p>
                </v-card>
            </v-col>
        </v-row>

        <!-- Modal shows error server -->
        <ModalComponent v-if="isErrorServer" :modal-title="'System message'" :modal-body="modalBody"></ModalComponent>
    </section>
</template>
  
<script>
import { apiGetAllRegisters } from '../api/xlsxFiles/apiGetAllRegisters';
import ModalComponent from "@/components/modal/ModalComponent.vue";

export default {
    components:{
        ModalComponent,
    },

    mounted() {
        this.getRegisters();
    },
    data() {
        return {
            items: [], // Array para almacenar los elementos de la tabla
            hasRegisters: false,
            registers: [{}],

            //Modal to show server error message
            isErrorServer: false,
            modalTitle: "Signup successful",
            modalBody: "Server not available"
        };
    },
    methods: {
        async getRegisters() {
            try {
                this.overlay = true;
                const response = await apiGetAllRegisters();
                this.overlay = false;
                console.log(response);


                //If server is not receiving requests
                if (response.isServerAvailable === false) {
                    console.log('Server not available');
                    this.modalBody = response.serverMessage;
                    this.isErrorServer = true;
                    return;
                }

                if (response.data.isSuccessful) {

                    if (response.data.allRegisters.length === 0) {
                        console.log('Without registers')
                        this.hasRegisters = false;

                    } else {
                        this.hasRegisters = true;
                        this.registers = response.data.allRegisters;
                        this.items = response.data.allRegisters;
                        console.log(response.data.allRegisters)
                    }
                }

            } catch (error) {
                console.log(error);
            }
        },
        agregarItem() {
            // Agregar un nuevo elemento vacío a la tabla
            this.items.push({ nombre: '', edad: '' });
        },
        guardarItem(item) {
            // Enviar la información a la base de datos o realizar alguna otra acción
            // Aquí puedes hacer una petición HTTP para guardar los cambios en la base de datos
            console.log('Guardar', item);
        },
        eliminarItem(item) {
            // Eliminar el elemento de la tabla
            const index = this.items.indexOf(item);
            if (index > -1) {
                this.items.splice(index, 1);
            }
        },
    },
};
</script>
  
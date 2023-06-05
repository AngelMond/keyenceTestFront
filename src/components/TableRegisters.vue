<template>
    <section class="container py-10">
        <!-- Show loading screen -->
        <v-overlay :model-value="overlay" class="align-center justify-center" persistent>
            <v-progress-circular color="red-darken-2" indeterminate size="64"></v-progress-circular>
        </v-overlay>

        <v-row cols="12" justify="center" class="my-10">
            <v-col cols="11" sm="10" md="10" lg="10" xl="10">
                <v-card v-if="hasRegisters">
                    <h3 class="py-3 text-center text-red-darken-2">Registers</h3>
                    <v-table fixed-header>
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
                            <tr v-for="record in records" :key="record._id">
                                <td>
                                    <input class="table-input" v-model="record.userId" />
                                </td>
                                <td>
                                    <input class="table-input" v-model="record.username" />
                                </td>
                                <td>
                                    <input class="table-input" v-model="record.date" />
                                </td>
                                <td>
                                    <input class="table-input" v-model="record.punchIn" />
                                </td>
                                <td>
                                    <input class="table-input" v-model="record.punchOut" />
                                </td>
                                <td>
                                    <v-btn class="primary" @click="saveUpdateRow(record)">Save</v-btn>
                                </td>
                                <td>
                                    <v-btn class="secondary" @click="deleteRow(record)">Delete</v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                    <v-row justify="between" class="ma-2">
                        <v-col cols="12" sm="6">
                            <p class="sencundary text-grey-darken-1">To edit a row click over the value or add a new row</p>
                        </v-col>
                        <v-col cols="12" sm="6">
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
                            Load file
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
import { apiUpdateRow } from '../api/xlsxFiles/apiUpdateRow';
import { apiDeleteRow } from '../api/xlsxFiles/apiDeleteRow';
import { apiAddFile } from '../api/xlsxFiles/apiAddFile';




import ModalComponent from "@/components/modal/ModalComponent.vue";

export default {
    components: {
        ModalComponent,
    },

    mounted() {
        this.getRegisters();
    },
    data() {
        return {
            //Save registers
            records: [],
            hasRegisters: false,
            // registers: [{}],

            overlay: false,

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
                //console.log(response);


                //If server is not receiving requests
                if (response.isServerAvailable === false) {
                    //console.log('Server not available');
                    this.modalBody = response.serverMessage;
                    this.isErrorServer = true;
                    return;
                }

                if (response.data.isSuccessful) {

                    if (response.data.allRegisters.length === 0) {
                        //console.log('Without registers')
                        this.hasRegisters = false;

                    } else {
                        this.hasRegisters = true;
                        // this.registers = response.data.allRegisters;
                        this.records = response.data.allRegisters;
                        //console.log(response.data.allRegisters)
                    }
                }

            } catch (error) {
                //console.log(error);
            }
        },
        agregarItem() {
            //Adds a new row to table and then user can enter the values for the row
            this.records.push({ userId: '', username: '', date: '', punchIn: '', punchOut: '' });
        },
        async saveUpdateRow(record) {
            // Enviar la información a la base de datos o realizar alguna otra acción
            const row = JSON.parse(JSON.stringify(record));
            //console.log(row)

            //Check if theres a register already 
            if (row._id) {
                //console.log('ya tiene un registro')

                this.overlay = true;
                const response = await apiUpdateRow(row);
                this.overlay = false;
                //console.log(response)

                //If server is not receiving requests
                if (response.isServerAvailable === false) {
                    //console.log('Server not available');
                    this.modalBody = response.serverMessage;
                    this.isErrorServer = true;
                    return;
                }

                //When updated is successful return all registers
                if (response.data.isSuccessful) {
                    this.records = response.data.updatedRegisters;

                    //Modal shows error message 
                } else {
                    this.modalBody = "Unexpected error, please try again";
                    this.isErrorServer = true;
                }

                //If therse no register, creates a new one
            } else {
                //console.log('crear un nuevo registro')


                this.overlay = true;
                const response = await apiAddFile(row);
                this.overlay = false;
                //console.log(response)

                //If server is not receiving requests
                if (response.isServerAvailable === false) {
                    //console.log('Server not available');
                    this.modalBody = response.serverMessage;
                    this.isErrorServer = true;
                    return;
                }

                //When create register is successful return all registers
                if (response.data.isSuccessful) {
                    this.records = response.data.allRegisters;

                    //Modal shows error message 
                } else {
                    this.modalBody = "Unexpected error, please try again";
                    this.isErrorServer = true;
                }
            }
        },

        async deleteRow(record) {
            //Find and deletes the selected row
            const row = JSON.parse(JSON.stringify(record));
            //console.log('Delete', row);

            this.overlay = true;
            const response = await apiDeleteRow(row);
            this.overlay = false;
            //console.log(response)


            //If server is not receiving requests
            if (response.isServerAvailable === false) {
                //console.log('Server not available');
                this.modalBody = response.serverMessage;
                this.isErrorServer = true;
                return;
            }

            if (response.data.isSuccessful) {
                const index = this.records.indexOf(record);
                if (index > -1) {
                    this.records.splice(index, 1);
                }

            } else {
                this.modalBody = "Unexpected error, please try again";
                this.isErrorServer = true;
            }
        },
    },
};
</script>
  
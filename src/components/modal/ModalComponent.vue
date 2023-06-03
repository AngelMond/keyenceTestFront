<template>
    <v-dialog v-model="dialogVisible" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ modalTitle }}</span>
            </v-card-title>
            <v-card-text>
                <p>{{ modalBody }}</p>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeDialog">Aceptar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
  
<script>
export default {
    props: {
        modalTitle: {
            type: String,
            default: "Moda title"
        },
        modalBody: {
            type: String,
            default: "MOdal body"
        }
    },
    data() {
        return {
            dialogVisible: true,
        };
    },
    methods: {
        openDialog() {
            this.dialogVisible = true;
        },
        closeDialog() {
            this.dialogVisible = false;
        }
    }
};
</script>
  
<template>
    <q-item clickable v-ripple>
        <q-item-section side>
            <q-radio v-if="showRadioButtons" v-model="folderValue" color="amber" val="1"/>
        </q-item-section>
        <q-item-section>
            <q-item-label>{{ folder.name }}</q-item-label>
        </q-item-section>
    </q-item>
</template>

<script>
export default {
    props: ['folder', 'showRadioButtons']
}
</script>
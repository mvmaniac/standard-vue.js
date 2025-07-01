<script setup lang="ts">
  import type { Comment } from 'src/types';

  import { useAsyncState } from '@vueuse/core';
  import { date } from 'quasar';

  import { getUserById } from 'src/services';
  import { useAuthStore } from 'stores/auth';

  const props = withDefaults(defineProps<Comment>(), {
    id: '',
    message: '',
    createdAt: () => new Date(),
    uid: '',
  });

  defineEmits<{
    delete: [id: string];
  }>();

  const { hasOwnContent } = useAuthStore();
  const { state: commentUser } = useAsyncState(
    () => getUserById(props.uid),
    null,
    {},
  );
</script>

<template>
  <q-item class="q-py-md">
    <q-item-section side top>
      <q-avatar size="md">
        <img :src="commentUser?.photoURL ?? ''" alt="" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <div class="flex text-caption">
        <span>{{ commentUser?.displayName }}</span>
        <span class="q-mx-xs">&middot;</span>
        <span class="text-grey-6">
          {{ date.formatDate(createdAt, 'YYYY. MM. DD HH:mm:ss') }}
        </span>
      </div>
      <div class="q-mt-sm">
        {{ message }}
      </div>
    </q-item-section>

    <q-item-section v-if="hasOwnContent(uid ?? '')" side top>
      <q-btn
        flat
        color="grey"
        icon="sym_o_delete"
        round
        dense
        @click="$emit('delete', id)"
      />
    </q-item-section>
  </q-item>
</template>

<style lang="scss" scoped></style>

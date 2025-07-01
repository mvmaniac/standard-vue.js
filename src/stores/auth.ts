import type { User as AuhUser } from 'firebase/auth';
import type { User } from 'src/types';

import { StorageSerializers, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

const emptyUser: User = {
  uid: '',
  photoURL: '',
  displayName: '',
  email: '',
  emailVerified: false,
};

export const useAuthStore = defineStore('auth', () => {
  const user = useLocalStorage<User>('auth/user', emptyUser, {
    serializer: StorageSerializers.object,
  });

  const isAuthenticated = computed(() => user.value.uid !== '');
  const uid = computed(() => user.value?.uid || '');

  const setUser = (authUser: AuhUser | null) => {
    console.log('[dev] setUser: ', authUser);

    if (!authUser) {
      user.value = emptyUser;
      return;
    }

    user.value = {
      uid: authUser.uid,
      photoURL: authUser.photoURL ?? '',
      displayName: authUser.displayName ?? '',
      email: authUser.email ?? '',
      emailVerified: authUser.emailVerified ?? false,
    };
  };

  const hasOwnContent = (contentUid: string) => {
    if (!isAuthenticated.value) {
      return false;
    }
    return uid.value === contentUid;
  };

  return {
    user,
    uid,
    isAuthenticated,
    setUser,
    hasOwnContent,
  };
});

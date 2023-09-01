import axios from 'axios';



export function attachUsers(tenant: number, role: number, users: number[]) {
  return axios.put(`/v1/users/permissions/attach/${role}/${tenant}`, { ids: users });
}

export function detachUsers(tenant: number, role: number, users: number[]) {
  return axios.put(`/v1/users/permissions/detach/${role}/${tenant}`, { ids: users });
}

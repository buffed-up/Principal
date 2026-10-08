const BASE_URL = 'http://localhost:3000/api';

export async function getProductos() {
  console.log('[api] GET', `${BASE_URL}/productos`);
  const res = await fetch(`${BASE_URL}/productos`);
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
}

export async function getProducto(id) {
  console.log('[api] GET', `${BASE_URL}/productos/${id}`);
  const res = await fetch(`${BASE_URL}/productos/${id}`);
  if (!res.ok) throw new Error('Producto no encontrado');
  return res.json();
}

export async function crearProducto(datos) {
  const res = await fetch(`${BASE_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  if (!res.ok) throw new Error('Error al crear producto');
  return res.json();
}

export async function actualizarProducto(id, datos) {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  if (!res.ok) throw new Error('Error al actualizar producto');
  return res.json();
}

export async function eliminarProducto(id) {
  const res = await fetch(`${BASE_URL}/productos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar producto');
}

export async function getUsuarios() {
  const res = await fetch(`${BASE_URL}/usuarios`);
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return res.json();
}

export async function getUsuario(id) {
  const res = await fetch(`${BASE_URL}/usuarios/${id}`);
  if (!res.ok) throw new Error('Usuario no encontrado');
  return res.json();
}

export async function crearUsuario(datos) {
  const res = await fetch(`${BASE_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  if (!res.ok) throw new Error('Error al crear usuario');
  return res.json();
}

export async function actualizarUsuario(id, datos) {
  const res = await fetch(`${BASE_URL}/usuarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  if (!res.ok) throw new Error('Error al actualizar usuario');
  return res.json();
}

export async function eliminarUsuario(id) {
  const res = await fetch(`${BASE_URL}/usuarios/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar usuario');
}

export async function login(correo, clave) {
  const res = await fetch(`${BASE_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, clave })
  });
  if (!res.ok) throw new Error('Correo o contraseña incorrectos');
  return res.json();
}
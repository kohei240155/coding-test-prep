function parseUser(raw) {
  if (!raw) throw new Error('raw is required');
  return { name: raw.name.toUpperCase() };
}

function loadUser(id) {
  const raw = id === 1 ? { name: 'alice' } : null;
  return parseUser(raw);
}

function renderProfile(id) {
  const user = loadUser(id);
  console.log('profile:', user);
}

renderProfile(1);
renderProfile(2);
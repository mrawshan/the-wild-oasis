import supabase, { supabaseUrl } from './supabase';

// For a new user (singup)
export async function signup({ fullName, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: '',
			},
		},
	});

	if (error) throw new Error(error.message);

	return data;
}

// For login
export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);

	return data;
}

// Getting the current user
export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession(); // Check there is an active session (Get session from local storage)
	if (!session.session) return null;

	const { data, error } = await supabase.auth.getUser();

	if (error) throw new Error(error.message);

	return data?.user;
}

// For logout
export async function logout() {
	const { error } = await supabase.auth.signOut();

	if (error) throw new Error(error.message);
}

// For updating the user
export async function updateCurrentUser({ password, fullName, avatar }) {
	// 01) Update password OR fullName (Here we did like this because Updating the password component and fullname, avatar two different components)
	let updateData;

	if (password) updateData = { password };
	if (fullName) updateData = { data: { fullName } };

	const { data, error } = await supabase.auth.updateUser(updateData);

	if (error) throw new Error(error.message);
	if (!avatar) return data;

	// 02) Upload the avatar image
	const fileName = `avatar-${data.user.id}-${Math.random()}`; // Generate a unique file name for the avatar (e.g.,  avatar-userId-randomNumber)

	// Uploading the avatar img to the supabase storage
	const { error: storageError } = await supabase.storage
		.from('avatars')
		.upload(fileName, avatar);

	if (storageError) throw new Error(storageError.message);

	// 03) Update avatar in the user
	const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
		data: {
			avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
		},
	});

	if (error2) throw new Error(error2.message);

	return updateUser;
}

import supabase, { supabaseUrl } from './supabase.js';

// Get cabins
export async function getCabins() {
	let { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		throw new Error('Cabins could not be loaded');
	}

	return data;
}

// Create/Update cabin
export async function createUpdateCabin(newCabin, id) {
	// Checking what kind of image is this (When editing)
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	// Random number with our image name (to make the image name unic) and we replaceAll '/' with '' because if there are any '/' then supabase willl create a folder base on that
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		'/',
		''
	);

	// cabin row image path
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 01) Create/Update cabin
	let query = supabase.from('cabins');

	// A) CREATE CABIN
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

	// B) UPDATE CABIN
	if (id)
		query = query
			.update({ ...newCabin, image: imagePath })
			.eq('id', id)
			.select();

	// Selecting the created or updated data
	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be created');
	}

	// 02) If creating cabin is successful then upload the image
	if (hasImagePath) return data;

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	// 03) Delete the cabin if there was an error uploading image
	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);

		console.error(storageError);
		throw new Error(
			'Cabin image could not be uploaded and the cabin was not created'
		);
	}

	return data;
}

// Delete cabin
export async function deleteCabin(id) {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id);

	console.log(id);

	if (error) {
		throw new Error('Cabin could not be deleted');
	}

	return data;
}

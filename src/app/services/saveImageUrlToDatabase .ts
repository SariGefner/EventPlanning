const saveImageUrlToDatabase = async (imageUrl: string, postId: string) => {
  try {
    const response = await fetch('/api/posts/save-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl,
        postId
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save image URL');
    }

    console.log('Image URL saved successfully');
  } catch (error) {
    console.error('Error saving image URL:', error);
  }
};

export default saveImageUrlToDatabase;
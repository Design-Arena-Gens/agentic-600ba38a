export async function POST(request) {
  try {
    // Use Pollinations AI for free image generation
    const prompt = encodeURIComponent(
      "A person reading a futuristic holographic QR code display, surrounded by lush green nature landscape with mountains and trees in the background, sci-fi technology, cyberpunk aesthetic, beautiful lighting, high quality digital art, 8k resolution"
    );

    const seed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=1024&seed=${seed}&nologo=true`;

    return Response.json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    return Response.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}

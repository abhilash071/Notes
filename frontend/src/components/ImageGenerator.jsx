// /frontend/components/ImageGenerator.jsx

import { useState } from 'react'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const styles = [
  { label: 'Anime', value: 'anime' },
  { label: 'Ghibli', value: 'ghibli' },
  { label: 'Realistic', value: 'real' }
]

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('anime')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

  const handleGenerate = async () => {
    if (!prompt) return
    setLoading(true)
    try {
      const imageRes = await axios.post('http://localhost:5000/api/images/generate', { prompt, style })
      setImageUrl(imageRes.data.image)

      const videoRes = await axios.post('http://localhost:5000/api/video/generate', { prompt, style })
      setVideoUrl(videoRes.data.video)
    } catch (err) {
      console.error('Error generating media:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mt-6">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-lg font-bold">AI Image + Video Generator</h2>

        <div className="space-y-2">
          <Label>Prompt</Label>
          <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your note..." />
        </div>

        <div className="space-y-2">
          <Label>Style</Label>
          <RadioGroup defaultValue={style} onValueChange={setStyle} className="flex gap-4">
            {styles.map((s) => (
              <div key={s.value} className="flex items-center space-x-2">
                <RadioGroupItem value={s.value} id={s.value} />
                <Label htmlFor={s.value}>{s.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Media'}
        </Button>

        {imageUrl && (
          <div className="mt-4">
            <Label>Generated Image</Label>
            <img src={imageUrl} alt="Generated" className="rounded-xl shadow" />
          </div>
        )}

        {videoUrl && (
          <div className="mt-4">
            <Label>Generated Video</Label>
            <video controls className="rounded-xl shadow w-full">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

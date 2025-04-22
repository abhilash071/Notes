// /frontend/components/ImageGenerator.jsx

// import { useState } from 'react'
// import axios from 'axios'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { Label } from '@/components/ui/label'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// const styles = [
//   { label: 'Anime', value: 'anime' },
//   { label: 'Ghibli', value: 'ghibli' },
//   { label: 'Realistic', value: 'real' }
// ]

// export default function ImageGenerator() {
//   const [prompt, setPrompt] = useState('')
//   const [style, setStyle] = useState('anime')
//   const [loading, setLoading] = useState(false)
//   const [imageUrl, setImageUrl] = useState('')
//   const [videoUrl, setVideoUrl] = useState('')

//   const handleGenerate = async () => {
//     if (!prompt) return
//     setLoading(true)
//     try {
//       const imageRes = await axios.post('http://localhost:5000/api/images/generate', { prompt, style })
//       setImageUrl(imageRes.data.image)

//       const videoRes = await axios.post('http://localhost:5000/api/video/generate', { prompt, style })
//       setVideoUrl(videoRes.data.video)
//     } catch (err) {
//       console.error('Error generating media:', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Card className="mt-6">
//       <CardContent className="p-4 space-y-4">
//         <h2 className="text-lg font-bold">AI Image + Video Generator</h2>

//         <div className="space-y-2">
//           <Label>Prompt</Label>
//           <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your note..." />
//         </div>

//         <div className="space-y-2">
//           <Label>Style</Label>
//           <RadioGroup defaultValue={style} onValueChange={setStyle} className="flex gap-4">
//             {styles.map((s) => (
//               <div key={s.value} className="flex items-center space-x-2">
//                 <RadioGroupItem value={s.value} id={s.value} />
//                 <Label htmlFor={s.value}>{s.label}</Label>
//               </div>
//             ))}
//           </RadioGroup>
//         </div>

//         <Button onClick={handleGenerate} disabled={loading}>
//           {loading ? 'Generating...' : 'Generate Media'}
//         </Button>

//         {imageUrl && (
//           <div className="mt-4">
//             <Label>Generated Image</Label>
//             <img src={imageUrl} alt="Generated" className="rounded-xl shadow" />
//           </div>
//         )}

//         {videoUrl && (
//           <div className="mt-4">
//             <Label>Generated Video</Label>
//             <video controls className="rounded-xl shadow w-full">
//               <source src={videoUrl} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   )
// }
// /frontend/components/ImageGenerator.jsx

// import { useState } from 'react'
// import axios from 'axios'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { Label } from '@/components/ui/label'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// const styles = [
//   { label: 'Anime', value: 'anime' },
//   { label: 'Ghibli', value: 'ghibli' },
//   { label: 'Realistic', value: 'real' }
// ]

// export default function ImageGenerator() {
//   const [prompt, setPrompt] = useState('')
//   const [style, setStyle] = useState('anime')
//   const [loading, setLoading] = useState(false)
//   const [imageUrl, setImageUrl] = useState('')
//   const [videoUrl, setVideoUrl] = useState('')

//   const handleGenerate = async () => {
//     if (!prompt) return
//     setLoading(true)
//     try {
//       const res = await axios.post('http://localhost:5000/api/images/generate', { prompt, style })
//       setImageUrl(res.data.image)
//       setVideoUrl(res.data.video)
//     } catch (err) {
//       console.error('Error generating image/video:', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Card className="mt-6">
//       <CardContent className="p-4 space-y-4">
//         <h2 className="text-lg font-bold">AI Image & Video Generator</h2>

//         <div className="space-y-2">
//           <Label>Prompt</Label>
//           <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your note..." />
//         </div>

//         <div className="space-y-2">
//           <Label>Style</Label>
//           <RadioGroup defaultValue={style} onValueChange={setStyle} className="flex gap-4">
//             {styles.map((s) => (
//               <div key={s.value} className="flex items-center space-x-2">
//                 <RadioGroupItem value={s.value} id={s.value} />
//                 <Label htmlFor={s.value}>{s.label}</Label>
//               </div>
//             ))}
//           </RadioGroup>
//         </div>

//         <Button onClick={handleGenerate} disabled={loading}>
//           {loading ? 'Generating...' : 'Generate Media'}
//         </Button>

//         {imageUrl && (
//           <div className="mt-4">
//             <h3 className="font-medium mb-1">Generated Image</h3>
//             <img src={imageUrl} alt="Generated" className="rounded-xl shadow" />
//           </div>
//         )}

//         {videoUrl && (
//           <div className="mt-4">
//             <h3 className="font-medium mb-1">Generated Video</h3>
//             <video controls src={videoUrl} className="rounded-xl shadow w-full"></video>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   )
// }
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
  const [loadingImage, setLoadingImage] = useState(false)
  const [loadingVideo, setLoadingVideo] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

  const handleGenerateImage = async () => {
    if (!prompt) return
    setLoadingImage(true)
    try {
      const res = await axios.post('http://localhost:5000/api/images/generate', { prompt, style })
      setImageUrl(res.data.image)
    } catch (err) {
      console.error('Error generating image:', err)
    } finally {
      setLoadingImage(false)
    }
  }

  const handleGenerateVideo = async () => {
    if (!prompt) return
    setLoadingVideo(true)
    try {
      const res = await axios.post('http://localhost:5000/api/videos/generate', { prompt, style })
      setVideoUrl(res.data.video)
    } catch (err) {
      console.error('Error generating video:', err)
    } finally {
      setLoadingVideo(false)
    }
  }

  return (
    <Card className="mt-6">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-lg font-bold">AI Media Generator</h2>

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

        <div className="flex gap-4">
          <Button onClick={handleGenerateImage} disabled={loadingImage}>
            {loadingImage ? 'Generating Image...' : 'Generate Image'}
          </Button>
          <Button onClick={handleGenerateVideo} disabled={loadingVideo}>
            {loadingVideo ? 'Generating Video...' : 'Generate Video'}
          </Button>
        </div>

        {imageUrl && (
          <div className="mt-4">
            <Label className="mb-1 block">Generated Image:</Label>
            <img src={imageUrl} alt="Generated" className="rounded-xl shadow max-w-full" />
          </div>
        )}

        {videoUrl && (
          <div className="mt-4">
            <Label className="mb-1 block">Generated Video:</Label>
            <video src={videoUrl} controls className="rounded-xl shadow max-w-full" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
export default function ImageGenerator({ defaultPrompt = '' }) {
    const [prompt, setPrompt] = useState(defaultPrompt)}
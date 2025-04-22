import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import axios from 'axios';

export default function CreatePostModal({ note, open, onClose }) {
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('Hindi');

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/translate', {
        text: note.content,
        targetLang: lang,
      });
      setTranslated(res.data.translation);
    } catch (err) {
      console.error('Translation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setTranslated('');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogTitle>Create Instagram Post from Note</DialogTitle>

        <div className="space-y-4">
          <div>
            <Label>Original Note:</Label>
            <Textarea value={note.content} readOnly />
          </div>

          <div>
            <Label>Target Language:</Label>
            <select
              className="border rounded-md w-full p-2 mt-1"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option>Hindi</option>
              <option>English</option>
              <option>Marathi</option>
              <option>Bengali</option>
            </select>
          </div>

          <Button onClick={handleTranslate} disabled={loading}>
            {loading ? 'Translating...' : 'Translate'}
          </Button>

          {translated && (
            <div>
              <Label>Translated Text:</Label>
              <Textarea value={translated} readOnly />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

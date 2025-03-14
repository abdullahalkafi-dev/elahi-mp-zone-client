'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME as string;
const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;

export function ImageUpload({ onChange, value }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('resource_type', 'image');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${'image'}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      onChange(data.secure_url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = () => {
    onChange('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={isUploading}
        />
        {isUploading && <p>Uploading...</p>}
      </div>
      {value && (
        <div className="relative w-32 h-32">
          <Image
            src={value}
            alt="Uploaded image"
            fill
            className="object-cover rounded-md"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-0 right-0 rounded-full"
            onClick={handleDelete}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/client';
import { RichBlogEditor } from '../components/blog/RichBlogEditor';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const BlogEditPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState<any | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const catRes = await apiRequest('/blog-categories');
        if (catRes.success) {
          setCategories(catRes.data.map((c: any) => ({ id: c._id, name: c.name })));
        }

        if (id && id !== 'new') {
          const blogRes = await apiRequest(`/blogs/${id}`);
          if (blogRes.success) {
            setBlogData(blogRes.data);
          }
        }
      } catch (err: any) {
        console.error('Failed to load article details', err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [id]);

  const handleSave = async (formData: any) => {
    setSaving(true);
    try {
      if (id && id !== 'new') {
        await apiRequest(`/blogs/${id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await apiRequest('/blogs', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      navigate('/blogs');
    } catch (err: any) {
      alert(err.message || 'Failed to save blog article.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" className="min-h-[50vh]" />;
  }

  return (
    <div className="max-w-6xl mx-auto py-2">
      <RichBlogEditor
        initialData={blogData}
        categories={categories}
        onSave={handleSave}
        onCancel={() => navigate('/blogs')}
        isLoading={saving}
      />
    </div>
  );
};

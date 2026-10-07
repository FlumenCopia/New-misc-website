import React, { useState } from 'react';
import { Eye, Edit3, Sparkles, Image as ImageIcon, Link as LinkIcon, List, Heading1, Heading2, Code } from 'lucide-react';
import { Button } from '../common/Button';

interface BlogFormData {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  featuredImage: string;
  category: string;
  author: string;
  publishDate: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  isPublished: boolean;
}

interface RichBlogEditorProps {
  initialData?: Partial<BlogFormData>;
  categories: Array<{ id: string; name: string }>;
  onSave: (data: BlogFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const RichBlogEditor: React.FC<RichBlogEditorProps> = ({
  initialData,
  categories,
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    contentHtml: initialData?.contentHtml || '',
    featuredImage: initialData?.featuredImage || '',
    category: initialData?.category || (categories[0]?.name || 'Digital Marketing'),
    author: initialData?.author || 'MiscArchive Team',
    publishDate: initialData?.publishDate
      ? new Date(initialData.publishDate).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    tags: initialData?.tags || [],
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
    seoKeywords: initialData?.seoKeywords || [],
    isPublished: initialData?.isPublished ?? true,
  });

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [tagsInput, setTagsInput] = useState<string>(
    (initialData?.tags || []).join(', ')
  );
  const [keywordsInput, setKeywordsInput] = useState<string>(
    (initialData?.seoKeywords || []).join(', ')
  );

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    setFormData((prev) => ({ ...prev, slug }));
  };

  const insertSnippet = (snippet: string) => {
    setFormData((prev) => ({
      ...prev,
      contentHtml: prev.contentHtml + '\n' + snippet,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const keywordsArray = keywordsInput
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    await onSave({
      ...formData,
      tags: tagsArray,
      seoKeywords: keywordsArray,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white">
            {initialData?._id ? 'Edit Article' : 'Compose New Article'}
          </h2>
          <p className="text-xs text-slate-400">
            Rich article editor preserving authentic long-form HTML and metadata.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Save Article
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Core Content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Building Visibility on YouTube: A Simple SEO-First Approach"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Slug */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                URL Slug *
              </label>
              <button
                type="button"
                onClick={generateSlug}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" /> Auto-generate from Title
              </button>
            </div>
            <div className="flex items-center">
              <span className="bg-slate-800 border border-r-0 border-slate-700 px-3 py-2.5 text-xs text-slate-400 rounded-l-lg select-none">
                /blog/
              </span>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="A-Simple-SEO-First-Approach"
                className="w-full bg-slate-900 border border-slate-700 rounded-r-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Short Excerpt / Summary
            </label>
            <textarea
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="A brief 1-2 sentence preview shown on card listings..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Rich Body Content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Article Body (Rich HTML) *
              </label>
              <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                    activeTab === 'edit'
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" /> Code Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> Formatted Preview
                </button>
              </div>
            </div>

            {/* Formatting Toolbar */}
            {activeTab === 'edit' && (
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-800/80 border border-slate-700 rounded-t-lg text-xs">
                <button
                  type="button"
                  onClick={() => insertSnippet('<h2>Subheading Title</h2>')}
                  className="px-2 py-1 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1"
                >
                  <Heading1 className="w-3.5 h-3.5" /> H2
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('<h3>Section Heading</h3>')}
                  className="px-2 py-1 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1"
                >
                  <Heading2 className="w-3.5 h-3.5" /> H3
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('<p>Enter paragraph text here...</p>')}
                  className="px-2 py-1 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded"
                >
                  &lt;p&gt;
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('<ul>\n  <li>Key point 1</li>\n  <li>Key point 2</li>\n</ul>')}
                  className="px-2 py-1 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1"
                >
                  <List className="w-3.5 h-3.5" /> Bullet List
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('<a href="https://" class="text-amber-400 underline">Link Anchor</a>')}
                  className="px-2 py-1 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1"
                >
                  <LinkIcon className="w-3.5 h-3.5" /> Link
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('<img src="/assets/images/blogs/sample.webp" alt="Description" class="rounded-lg my-4 max-w-full" />')}
                  className="px-2 py-1 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1"
                >
                  <ImageIcon className="w-3.5 h-3.5" /> Image
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('<blockquote>Quote text here...</blockquote>')}
                  className="px-2 py-1 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1"
                >
                  <Code className="w-3.5 h-3.5" /> Quote
                </button>
              </div>
            )}

            {activeTab === 'edit' ? (
              <textarea
                rows={16}
                required
                value={formData.contentHtml}
                onChange={(e) => setFormData({ ...formData, contentHtml: e.target.value })}
                placeholder="<p>Full article body with authentic paragraphs, quotes, and bullet points...</p>"
                className="w-full bg-slate-900 border border-slate-700 rounded-b-lg px-4 py-3 text-sm text-slate-100 font-mono leading-relaxed focus:outline-none focus:border-amber-500"
              />
            ) : (
              <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 min-h-[380px] prose-admin overflow-y-auto">
                <div dangerouslySetInnerHTML={{ __html: formData.contentHtml || '<p class="text-slate-500 italic">No content yet...</p>' }} />
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 Col): Publishing & SEO Sidebar */}
        <div className="space-y-5">
          {/* Publishing Controls */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white">Publishing Status</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300">Visibility:</span>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isPublished: !formData.isPublished })}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  formData.isPublished
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {formData.isPublished ? '● Published' : '○ Draft'}
              </button>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Publish Date</label>
              <input
                type="date"
                value={formData.publishDate}
                onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Technology">Technology</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-white">Featured Image</h3>
            <div>
              <input
                type="text"
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                placeholder="/assets/images/blogs/bl1.jpg"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Enter asset path or upload via Media Library.
              </p>
            </div>
            {formData.featuredImage && (
              <div className="rounded-lg overflow-hidden border border-slate-700 max-h-36 bg-black flex items-center justify-center">
                <img
                  src={formData.featuredImage}
                  alt="Preview"
                  onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* SEO Metadata */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-white">SEO & Meta Fields</h3>

            <div>
              <label className="block text-xs text-slate-400 mb-1">SEO Meta Title</label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                placeholder="Meta title tag"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">SEO Description</label>
              <textarea
                rows={2}
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                placeholder="Meta description summary..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">SEO Keywords (comma separated)</label>
              <input
                type="text"
                value={keywordsInput}
                onChange={(e) => setKeywordsInput(e.target.value)}
                placeholder="AI, SEO, Digital Marketing"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Digital Marketing, Ads, Strategy"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, SquarePen } from 'lucide-react';

type PostType = {
  id: number;
  title: string;
  username: string;
  content: string;
  timestamp: string;
}

type PostCardProps = {
  post: PostType;
  currentUser: string;
  openDeleteDialog: (post: PostType) => void;
  openEditDialog: (post: PostType) => void;
};

const mockPosts: PostType[] = [
  {
    id: 1,
    title: "My First Post at CodeLeap Network!",
    username: "Victor",
    content: "Curabitur suscipit suscipit tellus. Phasellus consectetur vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas...",
    timestamp: "25 minutes ago",
  },
  {
    id: 2,
    title: "My Second Post at CodeLeap Network!",
    username: "Vini",
    content: "Curabitur suscipit suscipit tellus. Phasellus consectetur vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas...",
    timestamp: "45 minutes ago",
  },
];

const PostCard = ({ post, currentUser, openDeleteDialog, openEditDialog }: PostCardProps) => {
  const isPostAuthor = post.username === currentUser
  return (
    <Card className="rounded-lg mt-6 w-full shadow-lg overflow-hidden">
      <CardHeader className="bg-[#7695EC] p-6 text-white flex-row justify-between items-center rounded-t-lg -mt-6">
        <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
        {isPostAuthor && (
          <div className="flex space-x-4">
            <Trash2 
              className="cursor-pointer" 
              size={24} 
              color="#FFFFFF" 
              onClick={() => openDeleteDialog(post)}
            />
            <SquarePen 
              className="cursor-pointer" 
              size={24} 
              color="#FFFFFF" 
              onClick={() => openEditDialog(post)}
            />
          </div>
        )}
        
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-bold text-sm">@{post.username}</span>
          <span className="text-gray-500 text-sm">{post.timestamp}</span>
        </div>
        <p className="text-black text-base">{post.content}</p>
      </CardContent>
    </Card>
  );
};

export default function MainPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true) // Fake Loading Posts
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<PostType | null>(null);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<PostType | null>(null);
  const [editFormTitle, setEditFormTitle] = useState('');
  const [editFormContent, setEditFormContent] = useState('');

  const router = useRouter();

  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');

    if(!storedUsername) {
      router.push('./')
    } else {
      setCurrentUser(storedUsername)
    }

    setTimeout(() => {
      const storedPosts = localStorage.getItem('codeleap-posts');
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts))
      } else {
        setPosts(mockPosts)
      }
      setIsLoading(false);
    }, 2000)

  }, [router])

  useEffect (() => {
    if (posts.length > 0 || !isLoading ) {
      localStorage.setItem('codeleap-posts', JSON.stringify(posts))
    } 
  }, [posts, isLoading])

  const handleLogout = () => {
    localStorage.removeItem('username');
    router.push('./')
  }

  const isCreateFormDisabled = title.trim() === '' || content.trim() === '';

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isCreateFormDisabled) return;
    
    const newPost = {
      id: Math.random(),
      title,
      content,
      username: currentUser,
      timestamp: "Just now",
    };
    
    setPosts([newPost, ...posts]);
    setTitle('');
    setContent('');
  };

  const openDeleteDialog = (post: PostType) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  const handleDeletePost = () => {
    if (postToDelete) {
      setPosts(posts.filter(post => post.id !== postToDelete.id));
      setIsDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  // Funções para a edição
  const openEditDialog = (post: PostType) => {
    setPostToEdit(post);
    setEditFormTitle(post.title);
    setEditFormContent(post.content);
    setIsEditDialogOpen(true);
  };
  
  const handleEditPost = (event: FormEvent) => {
    event.preventDefault();
    if (!postToEdit) return;

    setPosts(posts.map(p => 
      p.id === postToEdit.id ? { ...p, title: editFormTitle, content: editFormContent } : p
    ));

    setIsEditDialogOpen(false);
    setPostToEdit(null);
    setEditFormTitle('');
    setEditFormContent('');
  };

  return (
    <div className="min-h-screen bg-[#DDDDDD] flex flex-col items-center">
      <header className="fixed top-0 max-w-[800px] w-full bg-[#7695EC] text-white p-6 shadow-md z-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold">CodeLeap Network</h1>
        { currentUser && (
          <Button onClick={handleLogout} className='bg-red-500 hover:bg-red-600 text-white cursor-pointer'>
            Logout
          </Button>
        )}
      </header>
      
      <main className="w-full max-w-[800px] mt-24 px-4 md:px-0">
        {/* Formulário de Criação de Post */}
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold mb-4">What&apos;s on your mind?</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="title" className="font-normal text-base block">Title</label>
              <Input
                id="title"
                type="text"
                placeholder="Hello world"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="content" className="font-normal text-base block">Content</label>
              <Textarea
                id="content"
                placeholder="Content here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex justify-end mt-4">
                <Button 
                  type="submit" 
                  disabled={isCreateFormDisabled}
                  className={`w-[111px] h-[32px] rounded-md text-white font-bold text-base
                    ${isCreateFormDisabled ? 'bg-[#DDDDDD] text-[#767676] cursor-not-allowed' : 'bg-indigo-400 hover:bg-indigo-500 cursor-pointer'}
                  `}
                >
                  Create
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        { isLoading ? (
          <div className='flex justify-center items-center mt-8'>
            <p className='text-lg text-gray-600'>Loading posts...</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              currentUser={currentUser}
              openDeleteDialog={openDeleteDialog}
              openEditDialog={openEditDialog} 
            />
          ))
        )}
      </main>

      {/* Double Check Delete Post Modal */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md w-[350px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Are you sure you want to delete this item?</DialogTitle>
          </DialogHeader>
          <DialogFooter className="sm:justify-end mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleDeletePost}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modal To Edit Posts */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Edit item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditPost} className="flex flex-col gap-4">
            <label htmlFor="editTitle" className="font-normal text-base block">Title</label>
            <Input
              id="editTitle"
              type="text"
              placeholder="Hello world"
              value={editFormTitle}
              onChange={(e) => setEditFormTitle(e.target.value)}
            />
            <label htmlFor="editContent" className="font-normal text-base block">Content</label>
            <Textarea
              id="editContent"
              placeholder="Content here"
              value={editFormContent}
              onChange={(e) => setEditFormContent(e.target.value)}
            />
            <DialogFooter className="sm:justify-end mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
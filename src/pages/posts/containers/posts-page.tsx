import { useSelector } from 'react-redux';
import { Layout } from '@sima-land/ui-nucleons/layout';
import { Plate } from '@sima-land/ui-nucleons/plate';
import { Avatar, getUserAvatarProps } from '@sima-land/ui-nucleons/avatar';
import { Nav } from '../../../components/Nav';
import { UserSlice } from '../redux/user-slice';
import { PostsSlice } from '../redux/posts-slice';
import { AuthorsSlice } from '../redux/authors-slice';
import { Chip } from '@sima-land/ui-nucleons/chip';

export function PostsPage() {
  const user = useSelector(UserSlice.selectors.data);
  const posts = useSelector(PostsSlice.selectors.items);
  const authors = useSelector(AuthorsSlice.selectors.items);

  return (
    <Layout>
      <h1>Posts </h1>
      <Nav />

      {user && (
        <div style={{ marginBottom: '32px' }}>
          <h4>Hello, {user.name}</h4>
          {user.photo_url && (
            <Avatar
              {...getUserAvatarProps(
                { id: user.id, image: user.photo_url },
                { style: { '--avatar-size': '80px' } },
              )}
            />
          )}
        </div>
      )}

      {authors.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {authors.map(item => (
            <Chip key={item.id}>{item.username}</Chip>
          ))}
        </div>
      )}

      <div>
        {posts.map(item => (
          <Plate key={item.id} shadow='z3' style={{ padding: '24px', marginBottom: '24px' }}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </Plate>
        ))}
      </div>
    </Layout>
  );
}

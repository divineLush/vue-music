import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import SongItem from '@/components/AppSongItem.vue';

describe('Router', () => {
  test('renders router link', () => {
    const song = {
      docID: 'abc',
    };

    const wrapper = shallowMount(SongItem, {
      propsData: {
        song,
      },
      global: {
        components: {
          'router-link': RouterLinkStub,
        },
      },
    });

    const routerLink = wrapper.findComponent(RouterLinkStub);

    expect(routerLink.props().to).toEqual({
      name: 'song',
      params: {
        id: song.docID,
      },
    });
  });
});

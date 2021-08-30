import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import SongItem from '@/components/AppSongItem.vue';

describe('Snapshots SongItem.vue', () => {
  test('renders correctly', () => {
    const song = {
      docID: 'abc',
      modifiedName: 'test',
      displayName: 'test',
      commentCount: 5,
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

    expect(wrapper.element);
  });
});

import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import AppSongItem from '@/components/AppSongItem.vue';

describe('Home.vue', () => {
  test('renders list of songs', () => {
    const songs = [
      {}, {}, {}
    ];

    Home.methods.getSongs = () => false;

    const home = shallowMount(Home, {
      data() {
        return {
          songs,
        };
      },
      global: {
        mocks: {
          $t: (message) => message,
        },
      },
    });

    const items = home.findAllComponents(AppSongItem);

    expect(items).toHaveLength(songs.length);

    // check that items appear in a right order
    items.forEach((wrapper, idx) => {
      expect(wrapper.props().song).toStrictEqual(songs[idx]);
    });
  });
});

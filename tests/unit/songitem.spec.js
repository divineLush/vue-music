import AppSongItem from '@/components/AppSongItem.vue';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';

describe('AppSongItem.vue', () => {
  test('render song.displayName', () => {
    const song = {
      displayName: 'test',
    };

    const wrapper = shallowMount(AppSongItem, {
      propsData: {
        song,
      },
      global: {
        components: {
          'router-link': RouterLinkStub,
        },
      },
    });

    const compositionAuthor = wrapper.find('.text-grey-500');

    expect(wrapper.text()).toBe(song.displayName);
  });

  test('render song.docID id id attribute', () => {
    const song = {
      docID: 'abc',
    };

    const wrapper = shallowMount(AppSongItem, {
      propsData: {
        song,
      },
      global: {
        components: {
          'router-link': RouterLinkStub,
        },
      },
    });

    const compositionAuthor = wrapper.find('.text-grey-500');

    expect(wrapper.attributes().id).toBe(`song-id-${song.docID}`);
  });
});

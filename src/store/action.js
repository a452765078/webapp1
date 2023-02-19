import constVar from "@/assets/constVar/index";
import { getRandomList } from "@/assets/util/index";
export default {
  selectSong({ commit }, { songs, index }) {
    commit("setPlaying", true);
    commit("setPlayMode", constVar.SEQUENCE);
    commit("setPlayScreen", true);
    commit("setSequenceList", songs);
    commit("setPlayingList", songs);
    commit("setIndex", index);
  },
  selectRandomPlay({ commit }, { songs }) {
    const max = songs.length;
    const randomList = songs.concat();
    getRandomList(randomList, max);
    commit("setPlaying", true);
    commit("setPlayMode", constVar.RANDOM);
    commit("setPlayScreen", true);
    commit("setSequenceList", songs);
    commit("setPlayingList", randomList);
    commit("setIndex", 0);
  },
  setMiniPlay({ commit }) {
    commit("setPlayScreen", false);
  },
  setPlayModeBySequence({ commit, dispatch }, val) {
    let constList = [constVar.SEQUENCE, constVar.LOOP, constVar.RANDOM];
    let index = constList.findIndex((item) => item == val);
    if (index == constList.length - 1) {
      index = 0;
    } else {
      index++;
    }
    commit("setPlayMode", constList[index]);
  },
  setSequenceList({ commit }, songs) {
    commit("setPlayingList", songs);
  },
  setRandomList({ commit }, songs) {
    const max = songs.length;
    const list = songs.concat();
    getRandomList(list, max);
    commit("setPlayingList", list);
  },
  delSong({ state, commit }, songs) {
    const playingList = state.playingList.concat();
    const index = playingList.findIndex((item) => item.mid == songs.mid);
    playingList.splice(index, 1);
    commit("setPlayingList", playingList);
  },
  clearPlayList({ commit }) {
    commit("setPlayingList", []);
    commit("setPlaying", false);
  },
  selectSongBySong({ commit, state }, songs) {
    const playingList = state.playingList.concat();
    playingList.push(songs);
    const index = playingList.findIndex((item) => item.mid == songs.mid);
    commit("setPlaying", true);
    commit("setPlayMode", constVar.SEQUENCE);
    commit("setPlayScreen", true);
    commit("setSequenceList", playingList);
    commit("setPlayingList", playingList);
    commit("setIndex", index);
  },
};

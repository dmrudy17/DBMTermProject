/*
 * Use this to detect clicking outside of element
 */
import { onMounted } from "vue";
import { onBeforeMount } from "vue";
/* 
    @param {*} el_target_ref the root element for which clicking outside will trigger callback_fn
    @param {*} callback_fn function to call when clicked outside of element detected
*/
export function useClickOutside(el_target_ref, callback_fn) {
  if (!el_target_ref) return;

  let listener = (e) => {
    //check if what was clicjed was inclueded with target element or is what was passed in
    if (
      e.el_target == el_target_ref.value ||
      e.composedPath().includes(el_target_ref)
    ) {
      //clicked inside div thing
      return;
    }
    if (typeof callback_fn == "function") {
      callback_fn();
    }
  };

  //if component element not null
  //mount component for click anywhere within window
  onMounted(() => {
    window.addEventListener("click", listener);
  }),
    onBeforeMount(() => {
      window.removeEventListener("click", listener);
    });
  return {
    listener,
  };
}

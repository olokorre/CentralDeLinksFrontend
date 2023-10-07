import type { Ref } from "vue";

export default class Validator {

    required(fuild: Ref<string>, name: string): void {
        if (!fuild.value) throw new Error(`Campo obrigatório: ${name}`);
    }

}

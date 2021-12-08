<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <input
      type="search"
      class="filtro"
      v-on:input="filtroInput = $event.target.value"
      placeholder="filtre por parte do titulo"
    />
    {{ filtroInput }}
    <ul class="lista-fotos">
      <!-- Para acessar um objeto computed não precisa de parenteses -->
      <li
        class="lista-fotos-item"
        v-for="foto in fotosComFiltro"
        :key="foto._id"
      >
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo" />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";

export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva
  },
  data() {
    return {
      titulo: "AluraPic",
      fotos: [],
      filtroInput: ""
    };
  },
  created() {
    let promise = this.$http.get("http://localhost:3000/v1/fotos");
    promise
      .then(res => res.json())
      .then(
        fotos => (this.fotos = fotos),
        err => console.log(err)
      );
  },
  // quando precisa calcular algo use computed
  computed: {
    fotosComFiltro() {
      if (this.filtroInput) {
        // essa RegExp tem o que vc digitou onde irá varrer a lista de fotos aqueles que tem essa expressao
        let exp = new RegExp(this.filtroInput.trim(), "i");
        //expressao testa se nessa lista de fotos tem o que eu digitei na propriedade 'titulo'
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else return this.fotos;
    }
  }
};
</script>

<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>

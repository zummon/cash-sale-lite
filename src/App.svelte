<script>
	import { onMount } from "svelte";
	export let data;

	let l = data[""].label[""];
	let q = data[""].q;

	const amt = num => {
	  const str = Number(num).toLocaleString(undefined, {
	    minimumFractionDigits: 2,
	  });
	  return num ? `${q.cur} ${str}` : "";
	};
	const int = num => {
	  const str = Number(num).toLocaleString();
	  return num ? str : "";
	};
	const addItem = () => {
	  q.desc.push("");
	  q.price.push("");
	  q.qty.push("");
	  q = q;
	};
	const removeItem = () => {
	  q.desc.pop();
	  q.price.pop();
	  q.qty.pop();
	  q = q;
	};

	onMount(() => {
	  const s = new URLSearchParams(location.search);
	  let obj = q;
	  Object.keys(q).forEach(key => {
	    const values = s.getAll(key);
	    if (values.length > 0) {
	      if (Array.isArray(q[key])) {
	        obj[key] = values;
	        return;
	      }
	      obj[key] = values[0];
	    }
	  });
	  q = { ...data[q.lang].q, ...obj };
	});

	$: l = {
	  ...data[q.lang].label[""],
	  ...data[q.lang].label[q.doc]
	};
	$: q.amt = q.price.map((pr, i) => {
	  const num = Number(pr) * Number(q.qty[i]);
	  return num ? num : "";
	});
	$: q.total = q.amt.reduce((a, b) => {
	  const num = Number(a) + Number(b);
	  return num ? num : "";
	}, 0);
</script>

<div class="flex flex-wrap justify-center items-center my-4 print:hidden">
	{#each Object.keys(data) as lng, i (`lang-${i}`)}
		<button class="text-xl font-bold rounded-3xl py-2 px-4 {q.lang === lng ? "cursor-default text-gray-100" : "bg-gray-100 cursor-pointer"}" on:click={() => {
			q.lang = lng
		}}>
			{data[lng]['']}
		</button>
	{/each}
	{#each Object.keys(data[q.lang].label) as dc, i (`doc-${i}`)}
		<button class="text-xl font-bold rounded-3xl py-2 px-4 {q.doc === dc ? "cursor-default text-gray-100" : "bg-gray-100 cursor-pointer"}" on:click={() => {
			q.doc = dc
		}}>
			{data[q.lang].label[dc].title}
		</button>
	{/each}
</div>

<div class="font-sans p-4 max-w-[40rem] mx-auto print:max-w-none print:mx-0 bg-white text-black">
	<div class="flex">
		<div class="w-2/3 rounded-3xl bg-gray-100 pt-4 pb-4 pr-4 pl-4">
			<p class="p-2 text-lg" contenteditable="true" bind:textContent={q.rName}></p>
			<p class="p-2 " contenteditable="true" bind:textContent={q.rId}></p>
			<p class="p-2 " contenteditable="true" bind:textContent={q.rAddress}></p>
		</div>
		<div class="w-1/3 text-center pl-4">
			<div class="pb-4">
				<div class="">{l.no}</div>
				<p class="p-2 rounded-3xl border text-center" contenteditable="true" bind:textContent={q.no}></p>
			</div>
			<div class="">
				<div class="">{l.date}</div>
				<p class="p-2 rounded-3xl border text-center" contenteditable="true" bind:textContent={q.date}></p>
			</div>
		</div>
	</div>
	<h1 class="text-center w-2/3 flex items-center text-3xl mt-8 mb-8 mx-auto">
		<hr class="flex-1 border">
		<span class="pl-4 pr-4">{l.title}</span>
		<hr class="flex-1 border">
	</h1>
	<div class="flex items-center">
		<div class="w-1/3 text-right pr-4">{l.name}</div>
		<p class="p-2 w-2/3 border-b" contenteditable="true" bind:textContent={q.name}></p>
	</div>
	<div class="flex items-center">
		<div class="w-1/3 text-right pr-4">{l.id}</div>
		<p class="p-2 w-2/3 border-b" contenteditable="true" bind:textContent={q.id}></p>
	</div>
	<div class="flex items-center">
		<div class="w-1/3 text-right pr-4">{l.address}</div>
		<p class="p-2 w-2/3 border-b" contenteditable="true" bind:textContent={q.address}></p>
	</div>
	<table class="mt-8 mb-8 w-full">
		<thead class="">
			<tr class="border-b">
				<td class="p-2 whitespace-nowrap w-px">{l.qty}</td>
				<td class="p-2 break-all">{l.desc}
					<button class="text-3xl rounded-3xl cursor-pointer font-bold bg-gray-100 print:hidden px-2 mr-2" on:click={addItem}>+</button>
					<button class="text-3xl rounded-3xl cursor-pointer font-bold bg-gray-100 print:hidden px-2" on:click={removeItem}>-</button>
				</td>
				<td class="p-2 whitespace-nowrap w-px">{l.price}</td>
				<td class="p-2 whitespace-nowrap w-px">{l.amt}</td>
			</tr>
		</thead>
		<tbody class="">
			{#each q.desc as _, i (`item-${i}`)}
				<tr class="border-b">
					<td class="p-2 text-center whitespace-nowrap" contenteditable="true"
						on:focus={e => e.target.textContent = q.qty[i]}
						on:input={e => q.qty[i] = e.target.textContent}
						on:blur={e => e.target.textContent = int(q.qty[i])}
					>
						{int(q.qty[i])}
					</td>
					<td class="p-2 break-all" contenteditable="true" bind:textContent={q.desc[i]}></td>
					<td class="p-2 text-center whitespace-nowrap" contenteditable="true"
						on:focus={e => e.target.textContent = q.price[i]}
						on:input={e => q.price[i] = e.target.textContent}
						on:blur={e => e.target.textContent = amt(q.price[i])}
					>
						{int(q.price[i])}
					</td>
					<td class="p-2 text-right whitespace-nowrap">{amt(q.amt[i])}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot class="">
			<tr class="">
				<td class="p-2 "></td>
				<td class="p-2 "></td>
				<td class="p-2 whitespace-nowrap">{l.total}</td>
				<td class="p-2 text-right">{amt(q.total)}</td>
			</tr>
		</tfoot>
	</table>
	<div class="w-2/3 text-center">
		<div class="">{l.rSign}</div>
		<p class="p-2 border-b" contenteditable="true"></p>
	</div>
</div>

<div class="flex flex-wrap justify-center items-center my-4 print:hidden">
	<button class="text-xl rounded-3xl cursor-pointer font-bold bg-gray-100 py-2 px-4" on:click={() => window.print()}>
		Print
	</button>
</div>
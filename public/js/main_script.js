let nodes;
let edges;
let network;

const container = document.getElementById('container');
nodes = new vis.DataSet();
edges = new vis.DataSet();
const options = {
  nodes: {
    shape: 'block',
    scaling: {
      min: 10,
      max: 35,
      label: {
        min: 14,
        max: 30,
        drawThreshold: 9,
        maxVisible: 20
      },
    },

    font: {
      size: 10,
      face: 'Helvetica Neue, Helvetica, Arial'
    },
  },
  interaction: {
    hover: true,
    hoverConnectedEdges: true,
    selectConnectedEdges: false,
  },
};

const rButton = document.getElementById('refresh');
rButton.addEventListener('click', () => {
  nodes = new vis.DataSet();
  edges = new vis.DataSet();
  let data = {
    nodes,
    edges
  };
  network = new vis.Network(container, data, options);
});



const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', () => {
  var initialpages = [];
  var list = document.getElementById("searchItem").value;
  initialpages.push(list);

  initialpages.forEach((page) => {
    if (page.length > 0) {

      if (nodes.getIds().indexOf(page) === -1) {
        nodes.add([{
          id: lash(page),
          label: lash(page),
          value: 2,
          level: 0,

          color: {
            border: '#02b0d3',
            background: '#03C4EB',
            highlight: {
              border: '#03C4EB',
              background: '#02b0d3'
            },
            hover: {
              border: '#02b0d3',
              background: '#b3edf9'
            }
          },
          x: 0,
          y: 0,
          parent: lash(page), // Parent is self
        }, ]);
      }
    }
  });

  let data = {
    nodes,
    edges
  };

  network = new vis.Network(container, data, options);
  network.on('click', expantion);
});

function lash(page) {
  return page.charAt(0).toUpperCase() + page.slice(1)
}
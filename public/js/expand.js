function getEdgeConnecting(a, b) {
  const edge = edges.get({
    filter: e => (e.from === a && e.to === b) || (e.from === b && e.to === a),
  })[0];

  return (edge instanceof Object ? edge : {}).id;
}

function expandNodeCallback(page, data) {
  const node = nodes.get(page); // The node that was clicked
  const level = node.level + 1; // Level for new nodes is one more than parent
  const subpages = data;

  // Add all children to network
  const subnodes = [];
  const newedges = [];
  // Where new nodes should be spawned

  // Create node objects
  for (let i = 0; i < subpages.length; i += 1) {
    const subpage = subpages[i];
    const subpageID = subpage;
    if (nodes.getIds().indexOf(subpageID) === -1) { // Don't add if node exists
      subnodes.push({
        id: subpageID,
        label: lash(subpage),

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
        value: 1,
        parent: page,

      });
    }

    if (!getEdgeConnecting(page, subpageID)) { // Don't create duplicate edges in same direction
      newedges.push({
        from: page,
        to: subpageID,
        color: '#81E1F5'

      });
    }
  }

  // Add the stuff to the nodes array
  nodes.add(subnodes);
  edges.add(newedges);
}

function nodeexpantion(page) {
  const label = nodes.get(page).label;
  const pagename = label;
  getSubPages(pagename).then(data => expandNodeCallback(page, data));
}

function expantion(params) {
  if (params.nodes.length) {
    const pagename = params.nodes[0];

    nodeexpantion(pagename);
  }
}
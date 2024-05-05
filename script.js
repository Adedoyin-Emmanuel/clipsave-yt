const formatNumber = (count) => {
  if (count < 1000) {
    return count.toString();
  } else if (count < 1000000) {
    return (count / 1000).toFixed(1) + "K";
  } else if (count < 1000000000) {
    return (count / 1000000).toFixed(1) + "M";
  } else {
    return (count / 1000000000).toFixed(1) + "B";
  }
};

const renderData = (data, $) => {
  const {
    id,
    likes,
    dislikes,
    rating,
    viewCount,
    deleted,
    thumbnailUrl,
    title,
    a,
    links,
    vid,
    related,
  } = data;

  const imageRef = $("#ytThumbnail");
  imageRef.attr("src", thumbnailUrl);
  $("#likes").text(formatNumber(likes));
  $("#dislikes").text(formatNumber(dislikes));
  $("#views").text(formatNumber(viewCount));
  $("#deleted").text(deleted ? "Yes " : "No");
  $("#rating").text(formatNumber(Math.ceil(rating)));

  $("#videoTitle").html(`
         <p>
       ${title}
        </p>
        <p class="text-sm">${a.includes("@") ? a : "@" + a}</p>
    `);

  renderVideoTable(links, $, vid);
};

function KHtmlEncode(s) {
  var el = document.createElement("div");
  el.innerText = el.textContent = s;
  s = el.innerHTML;
  return s;
}
const renderVideoTable = (links, $, videoId) => {
  const { mp4, mp3, other } = links;

  const mp4Entry = Object.entries(mp4);
  const mp3Entry = Object.entries(mp3);
  const otherEntry = Object.entries(other);
  const mp4TableBody = $("#mp4TableBody");
  const mp3TableBody = $("#mp3TableBody");
  const othersTableBody = $("#othersTableBody");

  mp4TableBody.empty();
  mp3TableBody.empty();
  othersTableBody.empty();

  mp4Entry.forEach(([key, entry]) => {
    mp4TableBody.append(`
            <tr>
                <td class="px-6 py-3 text-start">${entry.q_text}</td>
                <td class="px-6 py-3 text-start">${entry.size || "Unknown"}</td>
                <td class="px-6 py-3 text-start">
                <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-[14px]"  onclick="handleConvert('${videoId}', '${
      entry.k
    }')">
                        Download
                </button>
                </td>
            </tr>
        `);
  });

  mp3Entry.forEach(([key, entry]) => {
    mp3TableBody.append(`
            <tr>
                <td class="px-6 py-3 text-start">${entry.q_text}</td>
                <td class="px-6 py-3 text-start">${entry.size || "Unknown"}</td>
                <td class="px-6 py-3 text-start">
                 <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-[14px]"  onclick="handleConvert('${videoId}', '${
      entry.k
    }')">
                        Download
                </button>
                </td>
            </tr>
        `);
  });

  otherEntry.forEach(([key, entry]) => {
    othersTableBody.append(`
            <tr>
                <td class="px-6 py-3 text-start">${entry.q_text}</td>
                <td class="px-6 py-3 text-start">${entry.size || "Unknown"}</td>
                <td class="px-6 py-3 text-start">
                   <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-[14px]"  onclick="handleConvert('${videoId}', '${
      entry.k
    }')">
                        Download
                </button>
                </td>
            </tr>
        `);
  });
};

const toggleLoading = (state, $) => {
  if (state == "show") {
    $("#loader").removeClass("hidden");
  } else {
    $("#loader").addClass("hidden");
  }
};

const handleConvert = (vId, token) => {
  console.log(vId, token);
};

jQuery(($) => {
  $.noConflict();

  const ANALYZE_URL = "http://localhost:3000/api/analyze";
  const DOWNLOAD_URL = "http://localhost:3000/api/downloader/youtube";

  const handleSubmit = (value) => {
    const youtubeLink = value;

    $.ajax({
      url: ANALYZE_URL,
      type: "POST",
      data: JSON.stringify({
        url: youtubeLink,
      }),
      success: (response) => {
        toggleLoading("hide", $);
        renderData(response.data, $);
      },
      error: (xhr, status, error) => {
        alert(error);
        toggleLoading("hide", $);
      },

      beforeSend: () => {
        toggleLoading("show", $);
      },
    });
  };

  $("#youtubeLinkInput").on("paste", (e) => {
    e.preventDefault();

    const pastedText = (e.originalEvent || e).clipboardData.getData("text");
    const input = $("#youtubeLinkInput");

    input.val(pastedText);

    handleSubmit(pastedText);
  });

  $("#form").on("submit", (e) => {
    e.preventDefault();
    const inputValue = $("#youtubeLinkInput").val();

    handleSubmit(inputValue);
  });
});

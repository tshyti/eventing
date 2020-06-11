using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace API.Helpers
{
    public static class HttpRequestHelper
    {
        public static string GetUserId(HttpContext context)
        {
            return context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}